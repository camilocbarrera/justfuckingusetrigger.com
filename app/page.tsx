import Image from 'next/image';
import { CodeBlock } from './components/code-block';
import { HeroSection } from './components/hero-section';

export default async function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <HeroSection />

        <div className="grid-section grid-section-no-top">
          <div className="col-span-1 sm:col-span-12 h-12 bg-pattern-diagonal-lines-left"></div>
        </div>

        <section className="grid-section grid-section-no-top">
          <div className="col-span-1 sm:col-span-12 px-3 py-12 md:py-16">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              We've all been there.
            </h2>
            <div className="space-y-4 text-lg leading-relaxed max-w-3xl">
              <p>
                It's Monday morning. You open Slack. <strong>"Hey, did the report generation run last night?"</strong> Spoiler: it didn't. The EC2 instance ran out of memory at 3 AM and nobody noticed because your "alerting" is just you checking CloudWatch when you remember.
              </p>
              <p>
                So you SSH into the box. You run <code className="rounded bg-card border border-border px-1.5 py-0.5 font-mono text-sm">pm2 logs</code>. You see the same error you saw last month. You fix it with the same hacky workaround. You tell yourself you'll "do it right" next sprint.
              </p>
              <p>
                Next sprint never comes. The technical debt compounds. And somehow <em>you're</em> the one on-call for a system you barely understand anymore.
              </p>
            </div>
          </div>
        </section>

        <section className="grid-section grid-section-no-top">
          <div className="col-span-1 sm:col-span-12 lg:col-span-5 px-3 py-8 flex flex-col justify-center">
            <h3 className="mb-4 text-2xl font-semibold md:text-3xl">
              monday-morning.log
            </h3>
            <p className="text-muted-foreground">Sound familiar? This is what "battle-tested infrastructure" looks like at most startups.</p>
          </div>
          <div className="col-span-1 sm:col-span-12 lg:col-span-7 px-3 py-8">
            <CodeBlock
              filename="monday-morning.log"
              code={`[slack] @channel did the PDF exports run?
[you] checking...
[you] shit

$ ssh prod-worker-01
$ pm2 logs export-service --lines 500
[ERROR] heap out of memory
[ERROR] heap out of memory
[ERROR] heap out of memory
# ...silence for 6 hours...

$ pm2 restart export-service
[PM2] Restarting...

# "Fixed"

[slack] @channel it's happening again
$ pm2 restart export-service
# repeat until you quit or the company dies`}
              language="bash"
            />
          </div>
        </section>

        <section className="grid-section grid-section-no-top">
          <div className="col-span-1 sm:col-span-12 px-3 py-8">
            <div className="space-y-3 text-lg">
              <p>Your current "architecture" probably includes:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li><strong>A PM2 process</strong> that restarts itself into oblivion</li>
                <li><strong>setTimeout calls</strong> pretending to be a scheduler</li>
                <li><strong>A Redis instance</strong> you're scared to look at</li>
                <li><strong>AWS Lambda functions</strong> timing out after 15 minutes</li>
                <li><strong>A Notion doc</strong> called "How to restart the workers" that's already outdated</li>
              </ul>
              <p className="mt-4 font-semibold">
                <strong>You're not running infrastructure. You're babysitting chaos.</strong>
              </p>
            </div>
          </div>
        </section>

        <div className="grid-section grid-section-no-top">
          <div className="col-span-1 sm:col-span-12 h-12 bg-pattern-diagonal-lines-right"></div>
        </div>

        <section className="grid-section grid-section-no-top">
          <div className="col-span-1 sm:col-span-12 px-3 py-12 md:py-16">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Enter Trigger.dev
            </h2>
            <div className="space-y-4 text-lg leading-relaxed max-w-3xl">
              <p>
                Trigger.dev is a <strong>TypeScript-first background jobs platform</strong>. You define tasks in code. You get retries, logging, and monitoring without configuring anything. It runs serverlessly so you don't manage VMs, containers, or "worker pools."
              </p>
              <p>
                It handles the stuff that doesn't belong in your API routes:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Generating PDFs and reports</li>
                <li>Sending transactional emails</li>
                <li>Processing uploads and media</li>
                <li>Syncing data with third-party APIs</li>
                <li>Running AI pipelines that take minutes, not milliseconds</li>
                <li>Scheduled jobs that actually run when they're supposed to</li>
              </ul>
              <p>
                No timeouts. No cold starts killing your long tasks. No praying that your cron job didn't silently fail.
              </p>
            </div>
          </div>
        </section>

        <section className="grid-section grid-section-no-top">
          <div className="col-span-1 sm:col-span-12 px-3 py-12 md:py-16">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              It's just TypeScript.
            </h2>
            <p className="mb-8 text-lg">
              No YAML. No DSLs. No "infrastructure as code" that requires a PhD to debug.
            </p>
          </div>
        </section>

        <section className="grid-section grid-section-no-top">
          <div className="col-span-1 sm:col-span-12 lg:col-span-4 px-3 py-8 flex flex-col justify-center">
            <h3 className="mb-3 text-xl font-semibold">
              One command to start
            </h3>
            <p className="text-muted-foreground text-base">
              Runs your tasks locally with full observability. Click the link it gives you to see exactly what's happening.
            </p>
          </div>
          <div className="col-span-1 sm:col-span-12 lg:col-span-8 px-3 py-8">
            <CodeBlock
              code="npx trigger.dev@latest dev"
              language="bash"
            />
          </div>
        </section>

        <section className="grid-section grid-section-no-top">
          <div className="col-span-1 sm:col-span-12 lg:col-span-4 px-3 py-8 flex flex-col justify-center">
            <h3 className="mb-3 text-xl font-semibold">
              Define a task
            </h3>
            <p className="text-muted-foreground text-base">
              It's an async function. That's it. Trigger.dev handles the queue, the retries, and the "why did this fail" dashboard.
            </p>
          </div>
          <div className="col-span-1 sm:col-span-12 lg:col-span-8 px-3 py-8">
            <CodeBlock
              filename="trigger/generateReport.ts"
              code={`import { task } from "@trigger.dev/sdk/v3";
import { generatePDF } from "../lib/pdf";
import { sendEmail } from "../lib/email";

export const generateReport = task({
  id: "generate-report",
  retry: { maxAttempts: 3 },
  run: async ({ userId, reportType }: { userId: string; reportType: string }) => {
    const data = await fetchReportData(userId, reportType);
    const pdf = await generatePDF(data);
    await sendEmail({ to: data.email, attachment: pdf });
    return { success: true, pages: pdf.pageCount };
  },
});`}
              language="ts"
            />
          </div>
        </section>

        <div className="grid-section grid-section-no-top">
          <div className="col-span-1 sm:col-span-12 h-12 bg-pattern-diagonal-lines-left"></div>
        </div>

        <section className="grid-section grid-section-no-top">
          <div className="col-span-1 sm:col-span-12 lg:col-span-6 px-3 py-12 md:py-16">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              What you're doing now
            </h2>
            <ul className="mb-8 ml-6 list-disc space-y-2 text-lg">
              <li>Wrapping everything in try-catch and hoping for the best</li>
              <li>Using <code className="rounded bg-card border border-border px-1.5 py-0.5 font-mono text-sm">node-cron</code> in a long-running process</li>
              <li>Spinning up BullMQ + Redis + a worker dyno</li>
              <li>Hitting Lambda's 15-minute timeout on legitimate workloads</li>
              <li>Debugging by adding more console.logs</li>
              <li>Finding out jobs failed when customers complain</li>
            </ul>
          </div>
          <div className="col-span-1 sm:col-span-12 lg:col-span-6 px-3 py-12 md:py-16">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              What Trigger.dev gives you
            </h2>
            <ul className="ml-6 list-disc space-y-2 text-lg">
              <li><strong>Automatic retries</strong> with exponential backoff</li>
              <li><strong>Built-in queues</strong> with concurrency control</li>
              <li><strong>Real cron</strong> that survives deploys and restarts</li>
              <li><strong>No timeouts</strong> — run for hours if you need to</li>
              <li><strong>Full observability</strong> — see every run, every log, every error</li>
              <li><strong>Alerts</strong> before your users notice something's wrong</li>
            </ul>
            <p className="mt-6 text-lg font-semibold">
              Background jobs should be boring. Trigger.dev makes them boring.
            </p>
          </div>
        </section>

        <section className="grid-section grid-section-no-top">
          <div className="col-span-1 sm:col-span-12 px-3 py-12 md:py-16">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              "My workflow is complex."
            </h2>
            <p className="mb-4 text-lg">
              No it isn't. You're doing some variation of:
            </p>
            <ol className="ml-6 list-decimal space-y-2 text-lg">
              <li>Receive a trigger (webhook, schedule, user action)</li>
              <li>Fetch some data</li>
              <li>Do something with it (transform, call an API, generate a file)</li>
              <li>Store the result or notify someone</li>
              <li>Handle failures gracefully</li>
            </ol>
            <p className="mt-4 text-lg">
              That's literally what Trigger.dev is designed for. Stop reinventing orchestration.
            </p>
          </div>
        </section>

        <section className="grid-section grid-section-no-top">
          <div className="col-span-1 sm:col-span-12 lg:col-span-6 px-3 py-12 md:py-16">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              "I don't want vendor lock-in."
            </h2>
            <p className="mb-4 text-lg">
              Your current stack has more lock-in than you think:
            </p>
            <ul className="mb-6 ml-6 list-disc space-y-2 text-lg">
              <li>The undocumented bash scripts in your deploy pipeline</li>
              <li>The Redis instance with 47 different key patterns</li>
              <li>The "simple" worker that's now 3000 lines</li>
              <li>The monitoring setup held together with Datadog queries and hope</li>
            </ul>
            <p className="text-lg">
              Trigger.dev is <strong>open source</strong>. Your tasks are TypeScript functions. You can self-host if you want to run your own infrastructure. (But why would you?)
            </p>
          </div>
          <div className="col-span-1 sm:col-span-12 lg:col-span-6 px-3 py-12 md:py-16">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              "It costs money."
            </h2>
            <p className="mb-4 text-lg">
              There's a free tier. But let's talk about what you're paying now:
            </p>
            <ul className="mb-6 ml-6 list-disc space-y-2 text-lg">
              <li>Engineer hours debugging silent failures</li>
              <li>Revenue lost when batch jobs don't complete</li>
              <li>Customer trust eroded by "sorry, it didn't send"</li>
              <li>The EC2 instance running 24/7 "just in case"</li>
              <li>Your sanity at 2 AM</li>
            </ul>
            <p className="text-lg">
              Paying for reliability isn't an expense. It's buying back your weekends.
            </p>
          </div>
        </section>

        <div className="grid-section grid-section-no-top">
          <div className="col-span-1 sm:col-span-12 h-12 bg-pattern-diagonal-lines-right"></div>
        </div>

        <section className="grid-section grid-section-no-top">
          <div className="col-span-1 sm:col-span-12 px-3 py-12 md:py-16">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Use Trigger.dev if:
            </h2>
            <ul className="space-y-3 text-lg">
              <li>→ You have background work that keeps breaking and you're tired of fixing it</li>
              <li>→ Your Lambda functions keep timing out on legitimate workloads</li>
              <li>→ You need scheduled jobs that actually run (and tell you when they don't)</li>
              <li>→ You're building AI features that take more than 30 seconds</li>
              <li>→ You want to see what your jobs are doing without SSHing into a box</li>
            </ul>
          </div>
        </section>

        <div className="grid-section grid-section-no-top">
          <div className="col-span-1 sm:col-span-12 h-12 bg-pattern-diagonal-lines-left"></div>
        </div>

        <section className="grid-section grid-section-no-top">
          <div className="col-span-1 sm:col-span-12 px-3 py-16 md:py-24 text-center">
            <h2 className="mb-8 text-4xl font-bold md:text-5xl">
              You know your current setup sucks.
            </h2>
            <p className="mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Stop pretending setTimeout is a queue.<br />
              Stop treating PM2 restarts as a monitoring strategy.<br />
              Stop being the human retry mechanism for your own infrastructure.
            </p>
            <p className="mb-8 text-2xl font-bold md:text-3xl">
              <strong>Just fucking use Trigger.dev.</strong>
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row justify-center">
              <a
                className="group outline-none w-fit"
                href="https://cloud.trigger.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex text-center font-sans transition justify-center items-center shrink-0 select-none group-focus:outline-none group-disabled:opacity-75 group-disabled:pointer-events-none h-12 px-5 rounded bg-primary hover:bg-primary/90 w-auto gap-x-1">
                  <span className="mx-auto grow self-center truncate transition text-primary-foreground text-lg font-medium">
                    Start building now
                  </span>
                  <span className="relative -mr-1 ml-1 flex size-6">
                    <span className="absolute rounded-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 h-[2.3px] w-[12px] translate-x-[6px] top-[calc(50%-1px)] bg-primary-foreground"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="absolute -translate-x-0.5 transition duration-300 ease-in-out group-hover:translate-x-1 size-6 text-primary-foreground">
                      <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"></path>
                    </svg>
                  </span>
                </div>
              </a>
              <a
                className="group outline-none w-fit"
                href="https://github.com/triggerdotdev/trigger.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="gap-x-2 text-center font-sans justify-center items-center shrink-0 select-none group-focus:outline-none px-4 rounded border border-border hover:bg-muted w-auto group flex h-12 transition">
                  <svg viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg" className="size-5">
                    <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="currentColor"></path>
                  </svg>
                  <span className="transition text-foreground">
                    Open source
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-grid-dimmed mt-8">
          <div className="max-w-4xl mx-auto px-6 py-12 text-center text-sm text-muted-foreground/70">
            <p className="mb-4 leading-relaxed">
              Inspired by{' '}
              <a href="https://justfuckingusetailwind.com" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground transition-colors">justfuckingusetailwind.com</a>,{' '}
              <a href="https://motherfuckingwebsite.com" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground transition-colors">motherfuckingwebsite.com</a>,{' '}
              <a href="https://bettermotherfuckingwebsite.com" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground transition-colors">bettermotherfuckingwebsite.com</a>,{' '}
              and the motherfucking website family.
            </p>
            <p className="mb-4">
              Built by{' '}
              <a href="https://x.com/camilocbarrera" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground transition-colors">Cris</a>.
            </p>
            <a
              href="https://github.com/camilocbarrera/justfuckingusetrigger.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-muted-foreground transition-colors"
            >
              <svg viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg" className="size-5">
                <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="currentColor"></path>
              </svg>
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
