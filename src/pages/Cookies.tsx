import { PageLayout } from "@/components/site/PageLayout";
import { PageHeader } from "@/components/site/PageHeader";

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24">
    <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4 text-gradient-gold">{title}</h2>
    <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px]">{children}</div>
  </section>
);

const Cookies = () => {
  return (
    <PageLayout
      title="Cookie Policy | Build Your Footprint"
      description="How Build Your Footprint Media, LLC uses cookies and similar tracking technologies."
    >
      <PageHeader
        eyebrow="Legal"
        title="Cookie Policy"
        description="How we use cookies and similar tracking technologies on our website."
      />

      <article className="container max-w-3xl pb-24">
        <div className="text-xs uppercase tracking-[0.2em] text-accent mb-10">
          Last updated: May 6, 2026
        </div>

        <div className="space-y-6 text-muted-foreground leading-relaxed text-[15px] mb-14">
          <p>
            This Cookie Policy explains how Build Your Footprint Media, LLC ("we," "us," or "our")
            uses cookies and similar technologies when you visit www.buildyourfootprint.com (the
            "Services"). It explains what these technologies are, why we use them, and your rights
            to control our use of them.
          </p>
          <p>
            In some cases we may use cookies to collect personal information, or that becomes
            personal information if we combine it with other information.
          </p>
        </div>

        {/* Table of contents */}
        <nav aria-label="Table of contents" className="glass rounded-lg p-6 mb-14">
          <h2 className="text-xs uppercase tracking-[0.2em] text-accent mb-4">Contents</h2>
          <ol className="space-y-2 text-sm list-decimal list-inside">
            {[
              ["what", "What are cookies"],
              ["why", "Why we use cookies"],
              ["types", "Types of cookies we use"],
              ["third-party", "Third party cookies"],
              ["control", "How you can control cookies"],
              ["other-tracking", "Other tracking technologies"],
              ["updates", "Updates to this policy"],
              ["contact", "How to contact us"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={`#${href}`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-14">
          <Section id="what" title="1. What are cookies">
            <p>
              Cookies are small data files that are placed on your computer or mobile device when
              you visit a website. They are widely used by site owners to make their websites work,
              or to work more efficiently, as well as to provide reporting information.
            </p>
            <p>
              Cookies set by the website owner (in this case, Build Your Footprint Media, LLC) are
              called "first party cookies." Cookies set by parties other than the website owner are
              called "third party cookies." Third party cookies enable third party features or
              functionality to be provided on or through the website (such as analytics, payments,
              and interactive content).
            </p>
          </Section>

          <Section id="why" title="2. Why we use cookies">
            <p>
              We use first and third party cookies for several reasons. Some cookies are required
              for technical reasons in order for our Services to operate, and we refer to these as
              "essential" or "strictly necessary" cookies. Other cookies enable us to track and
              target the interests of our visitors to enhance the experience on our Services. Third
              parties serve cookies through our Services for analytics and other purposes.
            </p>
          </Section>

          <Section id="types" title="3. Types of cookies we use">
            <p>
              The specific types of first and third party cookies served through our Services and
              the purposes they perform are described below:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="text-foreground">Essential cookies.</span> These cookies are
                strictly necessary to provide you with services available through our Services and
                to use some of its features, such as access to secure areas and your client portal.
              </li>
              <li>
                <span className="text-foreground">Performance and functionality cookies.</span>
                {" "}These are used to enhance the performance and functionality of our Services but
                are non-essential. However, without these cookies, certain functionality may become
                unavailable.
              </li>
              <li>
                <span className="text-foreground">Analytics and customization cookies.</span> These
                collect information that is used either in aggregate form to help us understand how
                our Services are being used or how effective our marketing campaigns are.
              </li>
              <li>
                <span className="text-foreground">Authentication cookies.</span> Used to identify
                you once you sign in and remember your session in the client portal.
              </li>
            </ul>
          </Section>

          <Section id="third-party" title="4. Third party cookies">
            <p>
              In addition to our own cookies, we may also use various third party cookies to report
              usage statistics, deliver payments through Stripe, and so on. These third parties may
              include analytics providers, payment processors, and authentication providers.
            </p>
            <p>
              Please note that we do not control the use of these third party cookies and recommend
              you consult the respective privacy and cookie policies of those providers.
            </p>
          </Section>

          <Section id="control" title="5. How you can control cookies">
            <p>
              You have the right to decide whether to accept or reject cookies. You can set or
              amend your web browser controls to accept or refuse cookies. If you choose to reject
              cookies, you may still use our Services though your access to some functionality and
              areas may be restricted.
            </p>
            <p>
              Most browsers allow you to refuse to accept cookies and to delete cookies. The
              methods for doing so vary from browser to browser, and from version to version. You
              can however obtain up-to-date information about blocking and deleting cookies via
              your browser's help pages.
            </p>
          </Section>

          <Section id="other-tracking" title="6. Other tracking technologies">
            <p>
              Cookies are not the only way to recognize or track visitors to a website. We may use
              other, similar technologies from time to time, like web beacons (sometimes called
              "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a
              unique identifier that enables us to recognize when someone has visited our Services
              or opened an email that we have sent them.
            </p>
            <p>
              We may also use local storage and similar technologies for performance, security, and
              user preferences.
            </p>
          </Section>

          <Section id="updates" title="7. Updates to this policy">
            <p>
              We may update this Cookie Policy from time to time in order to reflect, for example,
              changes to the cookies we use or for other operational, legal, or regulatory reasons.
              Please therefore revisit this Cookie Policy regularly to stay informed about our use
              of cookies and related technologies.
            </p>
            <p>The date at the top of this page indicates when it was last updated.</p>
          </Section>

          <Section id="contact" title="8. How to contact us">
            <p>
              If you have questions about our use of cookies or other technologies, please contact
              us at:
            </p>
            <div className="glass rounded-lg p-6 not-italic">
              <p className="text-foreground font-medium mb-2">Build Your Footprint Media, LLC</p>
              <p>1252 NW 208th Terrace</p>
              <p>Miami Gardens, FL 33169</p>
              <p>United States</p>
              <p className="mt-3">
                Email:{" "}
                <a href="mailto:info@buildyourfootprint.com" className="text-accent hover:underline">
                  info@buildyourfootprint.com
                </a>
              </p>
              <p>
                Website:{" "}
                <a href="https://www.buildyourfootprint.com" className="text-accent hover:underline">
                  www.buildyourfootprint.com
                </a>
              </p>
            </div>
          </Section>
        </div>
      </article>
    </PageLayout>
  );
};

export default Cookies;
