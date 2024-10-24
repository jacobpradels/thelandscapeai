import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://thelandscapeai.com
// - Name: Landscape AI
// - Description: A Generative AI tool to help you create beautiful landscape image concepts for your projects
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: jacob@thelandscapeai.com

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Privacy Policy for Landscape AI

Effective Date: October 23, 2024

At Landscape AI, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website, https://thelandscapeai.com.

Information We Collect

We collect the following information:

	•	Personal data: name, email, and payment information for order processing.
	•	Non-personal data: web cookies for improving your browsing experience.

How We Use Your Information

The personal information we collect is used solely for processing orders. We do not share your information with any third parties.

Children’s Privacy

We do not knowingly collect any data from children under the age of 13. If we become aware of such data collection, we will take immediate steps to delete it.

Changes to This Privacy Policy

We may update this Privacy Policy from time to time. If changes are made, we will notify you via email.

Contact Us

If you have any questions, please contact us at jacob@thelandscapeai.com.

This Privacy Policy is in effect as of the date listed above.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
