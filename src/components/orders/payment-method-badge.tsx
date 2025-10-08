export function PaymentMethodBadge({ method }: { method: string | null }) {
  if (!method) return <span className="text-slate-500">Sin especificar</span>;

  const methodConfig = {
    Cash: { label: "Efectivo", className: "bg-green-100 text-green-800" },
    Yape: { label: "Yape", className: "bg-purple-100 text-purple-800" },
    Card: { label: "Tarjeta", className: "bg-blue-100 text-blue-800" },
  };

  const config = methodConfig[method as keyof typeof methodConfig];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
