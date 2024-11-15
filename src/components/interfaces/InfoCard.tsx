"use client";

interface InfoCardProps {
  title: string;
  status: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, status, description }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Buena":
        return "text-green-600";
      case "Regular":
        return "text-yellow-600";
      case "Mala":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div
      className="mt-4 p-4 bg-transparent border-t border-gray-200 rounded-md  backdrop-blur-lg"
    >
      {/* Cabecera fija */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-gray-800">{title}</span>
        <span className={`text-sm ${getStatusColor(status)}`}>{status}</span>
      </div>

      {/* Contenido fijo */}
      <div className="text-gray-700">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
