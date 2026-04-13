<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validación de los campos
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255|unique:users',
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'destination_country' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // El primero que se registra es ADMIN automáticamente
        $role = User::count() === 0 ? 'admin' : 'user';

        // Crear el usuario
        $user = User::create([
            'username' => $request->username,
            'name' => $request->name,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'destination_country' => $request->destination_country,
            'role' => $role,
        ]);

        // Generar token para autologin
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'Usuario registrado con éxito',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
        ], 201);
    }

    public function login(Request $request)
    {
        // Validar credenciales
        $credentials = $request->only('email', 'password');

        // Intentar autenticar
        if (!$token = JWTAuth::attempt($credentials)){
            return response()->json(['error' => 'Credenciales inválidas'], 401);
        }

        // Devolvemos el token y los datos del usuario
        return $this->respondWithToken($token);
    }

    // Función de ayuda para dar formato a la respuesta del Token
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::guard('api')->factory()->getTTL() * 60,
            'user' => JWTAuth::setToken($token)->toUser()
        ]);
    }

    public function me()
    {
        return response()->json(Auth::guard('api')->user()->load('plan'));
    }

    public function index()
    {
        return response()->json(User::all());
    }

    public function logout()
    {
        Auth::guard('api')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(Auth::guard('api')->refresh());
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'Cuenta eliminada correctamente'], 200);
    }

    public function update(Request $request, $id)
    {
        \Log::info('Iniciant actualització de perfil per ID: ' . $id);
        $user = User::find($id);

        if (!$user) {
            \Log::warning('Usuari no trobat: ' . $id);
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        \Log::info('Validant dades...');
        $validatedData = $request->validate([
            'username'           => 'required|string|max:255|unique:users,username,'.$user->id,
            'name'               => 'required|string|max:255',
            'lastname'           => 'nullable|string|max:255',
            'email'              => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'password'           => 'nullable|string|min:6',
            'destination_country'=> 'nullable|string|max:255',
            'phone'              => 'nullable|string|max:50',
            'date_of_birth'      => 'nullable|date',
            'passport_number'    => 'nullable|string|max:50',
            'nationality'        => 'nullable|string|max:100',
            'emergency_contact'  => 'nullable|string|max:255',
            'plan_id'            => 'nullable|exists:plans,id',
            'passport_expiry'    => 'nullable|date',
            'preferred_language' => 'nullable|string|max:100',
            'address'            => 'nullable|string|max:255',
            'city'               => 'nullable|string|max:100',
            'postal_code'        => 'nullable|string|max:20',
            'gender'             => 'nullable|string|max:20',
        ]);

        \Log::info('Actualitzant camps del model...');
        $user->username           = $validatedData['username'];
        $user->name               = $validatedData['name'];
        $user->lastname           = $validatedData['lastname'] ?? null;
        $user->email              = $validatedData['email'];
        $user->phone              = $validatedData['phone'] ?? null;
        $user->date_of_birth      = $validatedData['date_of_birth'] ?? null;
        $user->passport_number    = $validatedData['passport_number'] ?? null;
        $user->nationality        = $validatedData['nationality'] ?? null;
        $user->emergency_contact  = $validatedData['emergency_contact'] ?? null;
        $user->destination_country= $validatedData['destination_country'] ?? null;
        $user->passport_expiry    = $validatedData['passport_expiry'] ?? null;
        $user->preferred_language = $validatedData['preferred_language'] ?? null;
        $user->address            = $validatedData['address'] ?? null;
        $user->city               = $validatedData['city'] ?? null;
        $user->postal_code        = $validatedData['postal_code'] ?? null;
        $user->gender             = $validatedData['gender'] ?? null;

        if (isset($validatedData['plan_id'])) {
            $user->plan_id = $validatedData['plan_id'];
        }

        if (!empty($validatedData['password'])) {
            $user->password = Hash::make($validatedData['password']);
        }

        \Log::info('Guardant a DB...');
        $user->save();
        \Log::info('Guardat correctament.');

        return response()->json([
            'message' => 'Perfil actualizado correctamente',
            'user' => $user->load('plan')
        ], 200);
    }
}
