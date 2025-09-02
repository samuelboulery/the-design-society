import Header from '@/components/Header'
import Events from '@/components/Events'
import Team from '@/components/Team'
import ContactForm from '@/components/ContactForm'

export default function Home() {
  return (
    <div className="min-h-screen max-w-3xl mx-auto p-4 font-sans">
      <Header />
      <Events />
      <Team />
      <ContactForm />
    </div>
  )
}