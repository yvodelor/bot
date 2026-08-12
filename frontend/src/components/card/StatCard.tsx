import type { LucideIcon } from 'lucide-react';

interface Props {
    label: string;
    value: string;
    icon: LucideIcon;
    trend?: 'up' | 'down';
    color?: 'blue' | 'green' | 'purple' | 'orange';
}

export default function StatCard({
    label,
    value,
    icon: Icon,
    trend,
    color = 'blue'
}: Props) {

    return (
        <div className={`stat-card ${color}`}>
            <div>
                <span>{label}</span>
                <strong>{value}</strong>
            </div>

            <Icon size={24} />

            {trend && (
                <span>
                    {trend === 'up' ? '↑' : '↓'}
                </span>
            )}
        </div>
    );
}