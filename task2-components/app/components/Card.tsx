type CardProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

const Card = ({ title, description, children }: CardProps) => (
  <div className="bg-white shadow-md rounded p-4 w-full max-w-md">
    <h2 className="text-lg font-bold mb-2">{title}</h2>
    {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
    {children}
  </div>
);

export default Card;
