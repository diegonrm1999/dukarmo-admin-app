"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ROLE_LABELS, ROLE_COLORS, Role, User } from "@/lib/types/user";
import { useUsers } from "@/hooks/use-users";

function RoleSection({ role, users }: { role: Role; users: User[] }) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{ROLE_LABELS[role]}</span>
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full border ${ROLE_COLORS[role]}`}
          >
            {users.length} {users.length === 1 ? "persona" : "personas"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <div className="text-slate-400 text-sm">
            No hay {ROLE_LABELS[role].toLowerCase()}
          </div>
        ) : (
          <ul className="space-y-3">
            {users.map((u) => (
              <li
                key={u.id}
                className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0"
              >
                <div>
                  <div className="font-medium text-slate-800">
                    {u.firstName} {u.lastName}
                  </div>
                  {u.email && (
                    <div className="text-sm text-slate-500">{u.email}</div>
                  )}
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full border ${
                    ROLE_COLORS[u.role]
                  }`}
                >
                  {ROLE_LABELS[u.role]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

export default function EmployeesPage() {
  const { stylists, cashiers, operators, managers, loading, error } = useUsers({
    strict: true,
  });

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (loading) {
    return <div className="text-slate-500">Cargando empleados...</div>;
  }

  return (
    <div className="space-y-6">
      <RoleSection role={Role.Manager} users={managers} />
      <RoleSection role={Role.Cashier} users={cashiers} />
      <RoleSection role={Role.Stylist} users={stylists} />
      <RoleSection role={Role.Operator} users={operators} />
    </div>
  );
}
