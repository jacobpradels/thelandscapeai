import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://thelandscapeai.com
// - Name: Landscape AI
// - Contact information: jacob@thelandscapeai.com
// - Description: A Generative AI tool to help you create beautiful landscape image concepts for your projects
// - Ownership: You own the images you create with Landscape AI.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://thelandscapeai.com/privacy-policy
// - Governing Law: United States
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
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
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Terms & Services for Landscape AI

Effective Date: October 23, 2024

Welcome to Landscape AI. By using our website, https://thelandscapeai.com, you agree to the following Terms & Services.

1. Ownership of Images

You retain full ownership of any images you create using Landscape AI.

2. User Information

We collect personal information (name, email, payment information) to process your orders. We also collect non-personal data (web cookies) to enhance your experience. For more details, see our Privacy Policy at https://thelandscapeai.com/privacy-policy.

3. Governing Law

These terms are governed by the laws of the United States.

4. Changes to Terms

We may update these Terms & Services from time to time. You will be notified of any changes via email.

5. Contact Information

If you have any questions, please contact us at jacob@thelandscapeai.com.

These Terms & Services are in effect as of the date listed above.`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
