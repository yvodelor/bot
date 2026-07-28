import { LucideIcon } from 'lucide-react';

interface Props {
  label: string ;
  value: String;
  icon: LucideIcon;

  trend?: 'up' | 'down';
  color?: 'blue' | 'green' | 'purple' | 'orange';
}
export default function StatCard