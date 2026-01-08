import Hero from "@/components/hero"
import WelcomeBanner from "@/components/welcome-banner"
import FeaturedDishes from "@/components/featured-dishes"
import Experience from "@/components/experience"
import BartendenVideos from "@/components/bartender-videos"
import ScrollRevealClient from "@/components/ScrollRevealClient"

export default function Home() {
  return (
    <ScrollRevealClient>
      <main>
        <div className="reveal">
          <Hero />
        </div>

        <div className="reveal">
          <WelcomeBanner />
        </div>

        <div className="reveal">
          <BartendenVideos />
        </div>

        <div className="reveal">
          <FeaturedDishes />
        </div>

        <div className="reveal">
          <Experience />
        </div>
      </main>
    </ScrollRevealClient>
  )
}
