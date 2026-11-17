import Card from '../../components/ui/Card'
import PageHeader from '../../components/ui/PageHeader'

export default function DashboardPage() {
  return (
    <div>
      <PageHeader title="Dashboard" description="Overview of your shop." />
      <Card className="p-6 text-sm text-slate-500">Statistics and charts are coming soon.</Card>
    </div>
  )
}
