"use client";

import { useState, useEffect } from "react";
import BookPageNatureCarousel from "./book-page-nature-carousel";
import { SensorDataResponse } from "./interfaces/SensorDataResponse";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Image from "next/image";
import * as XLSX from "xlsx"; // Importa la librería xlsx para exportar a Excel

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import InfoCard from "./interfaces/InfoCard";
import FooterComponent from "./interfaces/FooterComponent";

export default function DashboardComponent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sensorData, setSensorData] = useState<SensorDataResponse | null>(null);

  const currentDate = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(
          "https://citasmedicas.sintraunipricol.com.co/public/api/sensor"
        );
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const data: SensorDataResponse = await response.json();
        setSensorData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000); // Refrescar cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const labels =
    sensorData?.data.map((sensor) =>
      new Date(sensor.created_at).toLocaleTimeString()
    ) || [];

  const createGraphData = (label: string, values: number[], color: string) => ({
    labels,
    datasets: [
      {
        label,
        data: values,
        borderColor: color,
        backgroundColor: `${color}33`,
      },
    ],
  });

  const options = (title: string) => ({
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tiempo",
        },
      },
      y: {
        title: {
          display: true,
          text: "Valores",
        },
      },
    },
  });

  // Función para exportar todos los datos a un solo archivo de Excel
  const exportAllDataToExcel = () => {
    const data = {
      "Humedad Ambiente": sensorData?.data.map((sensor) => ({
        Hora: new Date(sensor.created_at).toLocaleTimeString(),
        Valor: sensor.humedadAmbiente,
      })),
      Temperatura: sensorData?.data.map((sensor) => ({
        Hora: new Date(sensor.created_at).toLocaleTimeString(),
        Valor: sensor.temperatura,
      })),
      "Humedad del Suelo": sensorData?.data.map((sensor) => ({
        Hora: new Date(sensor.created_at).toLocaleTimeString(),
        Valor: sensor.humedadSuelo,
      })),
      "Presión Atmosférica": sensorData?.data.map((sensor) => ({
        Hora: new Date(sensor.created_at).toLocaleTimeString(),
        Valor: sensor.presion,
      })),
      "Niveles de CO₂": sensorData?.data.map((sensor) => ({
        Hora: new Date(sensor.created_at).toLocaleTimeString(),
        Valor: sensor.co2,
      })),
    };

    const workbook = XLSX.utils.book_new();

    // Crear una hoja para cada tipo de sensor
    Object.keys(data).forEach((sheetName) => {
      const sheetData = data[sheetName as keyof typeof data]; // Especificar que 'sheetName' es una clave válida de 'data'
      const worksheet = XLSX.utils.json_to_sheet(sheetData || []);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    });

    // Guardar el archivo de Excel
    XLSX.writeFile(workbook, `Reporte_Datos_Sensores_${currentDate}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <Image
            src="/assets/img/LogoEcoPulse.png"
            alt="EcoPulse Logo"
            width={100} // Tamaño del logo inicial
            height={100} // Tamaño del logo inicial
            className="object-contain mr-4" // Espacio adicional a la derecha
          />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-green-800">EcoPulse</h1>
           <p className="text-2xl font-bold text-green-700">
  Desarrollando soluciones tecnológicas al servicio de la naturaleza
  y la sociedad.
</p>

          </div>

          <Image
            src="/assets/img/Logo-festech.png"
            alt="EcoPulse Logo"
            width={150} // Tamaño del segundo logo
            height={150} // Tamaño del segundo logo
            className="object-contain ml-4" // Espacio adicional a la izquierda
          />
        </header>

        <div>
          <BookPageNatureCarousel />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-center text-gray-700 tracking-wide mb-6">
            Gráficos Individuales de Datos de Sensores | {currentDate}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Humedad Ambiente */}
            <div>
              <InfoCard
                title="Humedad Ambiente"
                status="Buena"
                description="Regula el balance hídrico. Valores altos favorecen el crecimiento vegetal, pero pueden aumentar enfermedades fúngicas."
              />
              <Line
                data={createGraphData(
                  "Humedad Ambiente",
                  sensorData?.data.map((sensor) => sensor.humedadAmbiente) ||
                    [],
                  "rgba(75, 192, 192, 1)"
                )}
                options={options("Humedad Ambiente")}
              />
            </div>

            {/* Temperatura */}
            <div>
              <InfoCard
                title="Temperatura"
                status="Regular"
                description="Los cambios en la temperatura afectan el metabolismo de las plantas y animales. Valores extremos pueden ser perjudiciales."
              />
              <Line
                data={createGraphData(
                  "Temperatura",
                  sensorData?.data.map((sensor) => sensor.temperatura) || [],
                  "rgba(255, 99, 132, 1)"
                )}
                options={options("Temperatura")}
              />
            </div>

            {/* Humedad del Suelo */}
            <div>
              <InfoCard
                title="Humedad del Suelo"
                status="Buena"
                description="Indica la capacidad del suelo para almacenar agua. Valores adecuados son cruciales para la agricultura y los ecosistemas."
              />
              <Line
                data={createGraphData(
                  "Humedad del Suelo",
                  sensorData?.data.map((sensor) => sensor.humedadSuelo) || [],
                  "rgba(54, 162, 235, 1)"
                )}
                options={options("Humedad del Suelo")}
              />
            </div>

            {/* Presión Atmosférica */}
            <div>
              <InfoCard
                title="Presión Atmosférica"
                status="Buena"
                description="Valores estables benefician a los ecosistemas. Cambios rápidos pueden influir en el clima y los patrones de lluvia."
              />
              <Line
                data={createGraphData(
                  "Presión Atmosférica",
                  sensorData?.data.map((sensor) => sensor.presion) || [],
                  "rgba(153, 102, 255, 1)"
                )}
                options={options("Presión Atmosférica")}
              />
            </div>

            {/* Niveles de CO₂ */}
            <div>
              <InfoCard
                title="Niveles de CO₂"
                status="Mala"
                description="El aumento del CO₂ contribuye al calentamiento global y afecta la salud humana y los ecosistemas."
              />
              <Line
                data={createGraphData(
                  "Niveles de CO₂",
                  sensorData?.data.map((sensor) => sensor.co2) || [],
                  "rgba(255, 159, 64, 1)"
                )}
                options={options("Niveles de CO₂")}
              />
            </div>

            {/* Transmisión en vivo */}
            <div className="flex justify-center items-center">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/wKz4NUnCsy4?si=St1uQ-VDuQyak4DK"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={exportAllDataToExcel}
            className="mb-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Exportar Reporte Completo a Excel
          </button>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}
