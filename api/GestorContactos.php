<?php

class GestorContactos {

    /**
     * Guarda un nuevo mensaje de contacto en la tabla 'contactos'.
     *
     * @param string $supabase_url La URL de tu proyecto en Supabase.
     * @param string $supabase_key La clave (anon key) de tu proyecto.
     * @param string $nombre El nombre del remitente.
     * @param string $correo El correo del remitente.
     * @param string|null $celular El celular del remitente (opcional).
     * @param string $mensaje El mensaje del remitente.
     * @return bool True si se guardó correctamente, false en caso de error.
     */
    public static function guardarMensaje($supabase_url, $supabase_key, $nombre, $correo, $celular, $mensaje) {
        $url = "{$supabase_url}/rest/v1/contactos";

        // Construimos el array de datos que enviaremos.
        $data = [
            'nombre' => $nombre,
            'correo' => $correo,
            'celular' => $celular,
            'mensaje' => $mensaje
        ];

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "apikey: {$supabase_key}",
            "Authorization: Bearer {$supabase_key}",
            'Content-Type: application/json',
            'Prefer: return=minimal' // Le decimos a Supabase que no devuelva datos, solo que confirme la inserción.
        ]);

        curl_exec($ch);
        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        // HTTP 201 significa "Created", es la respuesta estándar para una inserción exitosa.
        return $httpcode === 201;
    }
}

?>