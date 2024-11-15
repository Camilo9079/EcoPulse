export interface Sensor {
    humedadAmbiente: number; // Humedad ambiental en porcentaje
    temperatura: number;     // Temperatura en grados Celsius
    humedadSuelo: number;    // Humedad del suelo en porcentaje
    presion: number;         // Presión atmosférica en hPa (hectopascales)
    co2: number;             // Nivel de CO2 en ppm (partes por millón)
    created_at: string
  }
  