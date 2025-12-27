import Image from 'next/image';

export function HeroSection() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '97%',
            maskImage: 'radial-gradient(ellipse 70% 80% at center, black 25%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at center, black 25%, transparent 85%)',
          }}
          className="h-full object-cover opacity-20 pointer-events-none rounded-[4rem]"
          src="https://content.trigger.dev/hero-video-h264.mp4"
        />
      </div>
      <section className="grid-section border-t-0 pt-16 md:pt-24 relative z-10">
        <div className="col-span-1 sm:col-span-12 px-3 py-8 text-center">
          <h1 className="mb-8 text-4xl font-bold leading-tight md:text-5xl">
            YOUR WORKERS KEEP DYING AND YOU KNOW IT
          </h1>
          <p className="mb-6 text-2xl font-semibold md:text-3xl">
            Just Fucking Use
          </p>
          <div className="flex justify-center mb-6">
            <a href="https://trigger.dev" target="_blank" rel="noopener noreferrer">
              <Image
                src="/trigger-logo.svg"
                alt="Trigger.dev"
                width={400}
                height={70}
                priority
              />
            </a>
          </div>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto">
            Every backend dev has that one job that randomly stops working. You check the logs. Nothing. You restart it. It works. Until it doesn't. Again.
          </p>
        </div>
      </section>
    </div>
  );
}

