"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Leaf,
  Sun,
  Droplets,
  Gauge,
  MonitorSmartphone,
  Volume2,
  Move,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define el tipo de los parámetros
type Parameter =
  | "Calidad del Aire"
  | "Humedad"
  | "Presión Atmosférica"
  | "Humedad del Suelo"
  | "Niveles de CO₂"
  | "Rayos Ultravioleta"
  | "Inclinación"
  | "Ruido Ambiental";
type City = "ciudad-a" | "ciudad-b" | "ciudad-c";

// Define los tipos para los datos de cada parámetro
type ParameterData = {
  staticValue: number;
  data: { month: string; value: number }[];
};

// Define el tipo completo de `cityData` usando `Record` para simplificar la estructura
type CityData = Record<Parameter, ParameterData>;

// Define el tipo para el objeto `cityData` con las ciudades
const cityData: Record<City, CityData> = {
  "ciudad-a": {
    "Calidad del Aire": {
      staticValue: 80,
      data: [
        { month: "Ene", value: 75 },
        { month: "Feb", value: 80 },
        { month: "Mar", value: 82 },
        { month: "Abr", value: 78 },
      ],
    },
    Humedad: {
      staticValue: 62,
      data: [
        { month: "Ene", value: 65 },
        { month: "Feb", value: 60 },
        { month: "Mar", value: 58 },
        { month: "Abr", value: 55 },
      ],
    },
    "Presión Atmosférica": {
      staticValue: 1015,
      data: [
        { month: "Ene", value: 1013 },
        { month: "Feb", value: 1016 },
        { month: "Mar", value: 1014 },
        { month: "Abr", value: 1015 },
      ],
    },
    "Humedad del Suelo": {
      staticValue: 40,
      data: [
        { month: "Ene", value: 38 },
        { month: "Feb", value: 42 },
        { month: "Mar", value: 40 },
        { month: "Abr", value: 39 },
      ],
    },
    "Niveles de CO₂": {
      staticValue: 400,
      data: [
        { month: "Ene", value: 410 },
        { month: "Feb", value: 420 },
        { month: "Mar", value: 400 },
        { month: "Abr", value: 395 },
      ],
    },
    "Rayos Ultravioleta": {
      staticValue: 5,
      data: [
        { month: "Ene", value: 4 },
        { month: "Feb", value: 6 },
        { month: "Mar", value: 5 },
        { month: "Abr", value: 5 },
      ],
    },
    Inclinación: {
      staticValue: 3,
      data: [
        { month: "Ene", value: 3 },
        { month: "Feb", value: 4 },
        { month: "Mar", value: 3 },
        { month: "Abr", value: 3 },
      ],
    },
    "Ruido Ambiental": {
      staticValue: 65,
      data: [
        { month: "Ene", value: 60 },
        { month: "Feb", value: 63 },
        { month: "Mar", value: 65 },
        { month: "Abr", value: 62 },
      ],
    },
  },
  "ciudad-b": {
    "Calidad del Aire": {
      staticValue: 70,
      data: [
        { month: "Ene", value: 70 },
        { month: "Feb", value: 72 },
        { month: "Mar", value: 68 },
        { month: "Abr", value: 75 },
      ],
    },
    Humedad: {
      staticValue: 55,
      data: [
        { month: "Ene", value: 55 },
        { month: "Feb", value: 53 },
        { month: "Mar", value: 58 },
        { month: "Abr", value: 57 },
      ],
    },
    "Presión Atmosférica": {
      staticValue: 1010,
      data: [
        { month: "Ene", value: 1010 },
        { month: "Feb", value: 1011 },
        { month: "Mar", value: 1012 },
        { month: "Abr", value: 1010 },
      ],
    },
    "Humedad del Suelo": {
      staticValue: 45,
      data: [
        { month: "Ene", value: 42 },
        { month: "Feb", value: 44 },
        { month: "Mar", value: 43 },
        { month: "Abr", value: 45 },
      ],
    },
    "Niveles de CO₂": {
      staticValue: 420,
      data: [
        { month: "Ene", value: 415 },
        { month: "Feb", value: 425 },
        { month: "Mar", value: 418 },
        { month: "Abr", value: 420 },
      ],
    },
    "Rayos Ultravioleta": {
      staticValue: 6,
      data: [
        { month: "Ene", value: 6 },
        { month: "Feb", value: 5 },
        { month: "Mar", value: 6 },
        { month: "Abr", value: 7 },
      ],
    },
    Inclinación: {
      staticValue: 2,
      data: [
        { month: "Ene", value: 2 },
        { month: "Feb", value: 2 },
        { month: "Mar", value: 3 },
        { month: "Abr", value: 2 },
      ],
    },
    "Ruido Ambiental": {
      staticValue: 60,
      data: [
        { month: "Ene", value: 62 },
        { month: "Feb", value: 61 },
        { month: "Mar", value: 63 },
        { month: "Abr", value: 60 },
      ],
    },
  },
  "ciudad-c": {
    "Calidad del Aire": {
      staticValue: 90,
      data: [
        { month: "Ene", value: 88 },
        { month: "Feb", value: 85 },
        { month: "Mar", value: 89 },
        { month: "Abr", value: 90 },
      ],
    },
    Humedad: {
      staticValue: 68,
      data: [
        { month: "Ene", value: 68 },
        { month: "Feb", value: 70 },
        { month: "Mar", value: 67 },
        { month: "Abr", value: 69 },
      ],
    },
    "Presión Atmosférica": {
      staticValue: 1020,
      data: [
        { month: "Ene", value: 1019 },
        { month: "Feb", value: 1021 },
        { month: "Mar", value: 1020 },
        { month: "Abr", value: 1022 },
      ],
    },
    "Humedad del Suelo": {
      staticValue: 50,
      data: [
        { month: "Ene", value: 49 },
        { month: "Feb", value: 50 },
        { month: "Mar", value: 51 },
        { month: "Abr", value: 50 },
      ],
    },
    "Niveles de CO₂": {
      staticValue: 390,
      data: [
        { month: "Ene", value: 385 },
        { month: "Feb", value: 390 },
        { month: "Mar", value: 392 },
        { month: "Abr", value: 388 },
      ],
    },
    "Rayos Ultravioleta": {
      staticValue: 4,
      data: [
        { month: "Ene", value: 4 },
        { month: "Feb", value: 5 },
        { month: "Mar", value: 4 },
        { month: "Abr", value: 4 },
      ],
    },
    Inclinación: {
      staticValue: 4,
      data: [
        { month: "Ene", value: 3 },
        { month: "Feb", value: 4 },
        { month: "Mar", value: 3 },
        { month: "Abr", value: 4 },
      ],
    },
    "Ruido Ambiental": {
      staticValue: 70,
      data: [
        { month: "Ene", value: 68 },
        { month: "Feb", value: 69 },
        { month: "Mar", value: 70 },
        { month: "Abr", value: 71 },
      ],
    },
  },
};

// Definimos el tipo para cada parámetro en `parameterInfo`
type ParameterInfo = {
  icon: JSX.Element;
  description: string;
  ranges: {
    good: string;
    regular: string;
    low: string;
    alert: string;
  };
  effect: string;
};

const parameterInfo: Record<Parameter, ParameterInfo> = {
  "Calidad del Aire": {
    icon: <Leaf className="h-4 w-4 text-green-500" />,
    description:
      "La calidad del aire afecta tanto la salud humana como la del ecosistema, ya que los contaminantes pueden perjudicar a plantas y animales.",
    ranges: {
      good: "70 - 100 (Buena)",
      regular: "50 - 69 (Regular)",
      low: "30 - 49 (Mala)",
      alert: "0 - 29 (Alerta)",
    },
    effect:
      "El aire contaminado puede causar problemas respiratorios en humanos y afectar el crecimiento de las plantas, además de dañar los ecosistemas acuáticos cercanos.",
  },
  Humedad: {
    icon: <Droplets className="h-4 w-4 text-blue-500" />,
    description:
      "La humedad adecuada es esencial para la vida de plantas y animales en el ecosistema.",
    ranges: {
      good: "40% - 70%",
      regular: "30% - 40% o 70% - 80%",
      low: "Por debajo de 30%",
      alert: "Por encima de 80%",
    },
    effect:
      "Los niveles inadecuados de humedad pueden llevar a condiciones de sequía o exceso de agua, afectando la biodiversidad y la calidad del suelo.",
  },
  "Presión Atmosférica": {
    icon: <Gauge className="h-4 w-4 text-gray-500" />,
    description:
      "La presión atmosférica influye en los patrones climáticos y puede afectar la salud humana.",
    ranges: {
      good: "1000 - 1020 hPa",
      regular: "980 - 999 hPa o 1021 - 1030 hPa",
      low: "Por debajo de 980 hPa",
      alert: "Por encima de 1030 hPa",
    },
    effect:
      "Presiones bajas pueden provocar dolores de cabeza en algunas personas, mientras que las altas presiones están asociadas con clima estable.",
  },
  "Humedad del Suelo": {
    icon: <Droplets className="h-4 w-4 text-brown-500" />,
    description:
      "La humedad del suelo es crucial para el crecimiento de las plantas y la biodiversidad.",
    ranges: {
      good: "30% - 60%",
      regular: "20% - 30% o 60% - 70%",
      low: "Por debajo de 20%",
      alert: "Por encima de 70%",
    },
    effect:
      "La falta de humedad en el suelo puede llevar a la desertificación, mientras que un exceso puede afectar el drenaje y causar pudrición de raíces.",
  },
  "Niveles de CO₂": {
    icon: <MonitorSmartphone className="h-4 w-4 text-green-500" />,
    description:
      "Los niveles de CO₂ son un indicador importante de la calidad del aire y el cambio climático.",
    ranges: {
      good: "350 - 400 ppm",
      regular: "400 - 450 ppm",
      low: "Por debajo de 350 ppm",
      alert: "Por encima de 450 ppm",
    },
    effect:
      "Altos niveles de CO₂ contribuyen al calentamiento global y pueden afectar la salud respiratoria.",
  },
  "Rayos Ultravioleta": {
    icon: <Sun className="h-4 w-4 text-yellow-500" />,
    description:
      "La radiación UV es importante para la producción de vitamina D, pero la sobreexposición es dañina.",
    ranges: {
      good: "0 - 2 (Bajo)",
      regular: "3 - 5 (Moderado)",
      low: "No aplica",
      alert: "6 o más (Alto a extremo)",
    },
    effect:
      "Exposiciones altas a rayos UV pueden causar quemaduras y aumentar el riesgo de cáncer de piel.",
  },
  Inclinación: {
    icon: <Move className="h-4 w-4 text-orange-500" />,
    description:
      "La inclinación del terreno puede indicar riesgos de deslizamientos de tierra en áreas montañosas.",
    ranges: {
      good: "0° - 5°",
      regular: "5° - 15°",
      low: "No aplica",
      alert: "Por encima de 15°",
    },
    effect:
      "Inclinaciones mayores aumentan el riesgo de deslizamientos, especialmente en épocas de lluvias.",
  },
  "Ruido Ambiental": {
    icon: <Volume2 className="h-4 w-4 text-purple-500" />,
    description:
      "El ruido ambiental excesivo afecta la calidad de vida y puede tener impactos negativos en la salud.",
    ranges: {
      good: "30 - 50 dB",
      regular: "50 - 70 dB",
      low: "Por debajo de 30 dB",
      alert: "Por encima de 70 dB",
    },
    effect:
      "Niveles altos de ruido pueden provocar estrés y problemas de audición a largo plazo.",
  },
};

export default function DashboardComponent() {
  const [selectedLocation, setSelectedLocation] = useState<City>("ciudad-a");
  const [selectedParameter, setSelectedParameter] = useState<Parameter | null>(
    null
  );

  const toggleParameterChart = (parameter: Parameter) => {
    setSelectedParameter(selectedParameter === parameter ? null : parameter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-800">
            EcoPulse Tecnología para la Biodiversidad y el Clima
          </h1>
         

          <Select
            value={selectedLocation}
            onValueChange={(city) => setSelectedLocation(city as City)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar ubicación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ciudad-a">Ciudad A</SelectItem>
              <SelectItem value="ciudad-b">Ciudad B</SelectItem>
              <SelectItem value="ciudad-c">Ciudad C</SelectItem>
            </SelectContent>
          </Select>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {Object.keys(parameterInfo).map((parameter) => (
    <Card key={parameter} onClick={() => toggleParameterChart(parameter as Parameter)} className="cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{parameter}</CardTitle>
        {parameterInfo[parameter as Parameter].icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{cityData[selectedLocation][parameter as Parameter].staticValue}%</div>
        <Progress value={cityData[selectedLocation][parameter as Parameter].staticValue} className="mt-2" />
        <p className="text-xs text-muted-foreground mt-2">Valor simulado</p>
      </CardContent>
    </Card>
  ))}
  
  {/* Transmisión en vivo en una tarjeta que ocupa toda la fila */}
  <div className="col-span-1 md:col-span-2 lg:col-span-4">
    <Card className="p-4 flex flex-col items-center bg-white shadow-md rounded-lg">
      <iframe 
        width="100%" 
        height="250" 
        src="https://www.youtube.com/embed/wKz4NUnCsy4?si=yiZja3bDHj2oezLN" 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
        className="rounded-md"
      ></iframe>
      <p className="text-sm text-gray-600 mt-2">Transmisión en vivo del ecosistema en tiempo real.</p>
    </Card>
  </div>
</div>


        {/* Mostrar la gráfica e información del parámetro seleccionado */}
        {selectedParameter && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">{selectedParameter}</h2>
            <p className="text-gray-700 mb-4">
              {parameterInfo[selectedParameter].description}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Efecto en el Ecosistema y la Sociedad:</strong>{" "}
              {parameterInfo[selectedParameter].effect}
            </p>

            <div className="mb-4">
              <h3 className="font-semibold text-lg">Intervalos de Valores:</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>
                  <strong>Bueno:</strong>{" "}
                  {parameterInfo[selectedParameter].ranges.good}
                </li>
                <li>
                  <strong>Regular:</strong>{" "}
                  {parameterInfo[selectedParameter].ranges.regular}
                </li>
                <li>
                  <strong>Malo:</strong>{" "}
                  {parameterInfo[selectedParameter].ranges.low}
                </li>
                <li>
                  <strong>Alerta:</strong>{" "}
                  {parameterInfo[selectedParameter].ranges.alert}
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Promedio Mensual de {selectedParameter} en{" "}
                    {selectedLocation}
                  </CardTitle>
                  <CardDescription>Últimos 12 meses</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={cityData[selectedLocation][selectedParameter].data}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#059669"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Descargar Reporte Completo
          </Button>
        </div>
      </div>
    </div>
  );
}
