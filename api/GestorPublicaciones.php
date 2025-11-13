<?php

class GestorPublicaciones {

    /**
     * Obtiene todos los registros de la tabla 'publicaciones'.
     * 
     * @param string $supabase_url La URL de tu proyecto en Supabase.
     * @param string $supabase_key La clave (anon key) de tu proyecto.
     * @return array Un array con las publicaciones o un array vacío en caso de error.
     */
    public static function obtenerTodas($supabase_url, $supabase_key) {
        // Apuntamos a la nueva tabla 'publicaciones' y ordenamos por id.
        $url = "{$supabase_url}/rest/v1/publicaciones?select=*&order=id.asc";

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "apikey: {$supabase_key}",
            "Authorization: Bearer {$supabase_key}"
        ]);

        $response = curl_exec($ch);
        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpcode === 200) {
            return json_decode($response, true);
        } else {
            // Es importante devolver un array vacío si algo falla,
            // para no causar errores en el JavaScript que espera un array.
            return [];
        }
    }
}

?>