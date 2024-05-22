import logger from "@/libs/logger";
import { cookies } from "next/headers";
import React from "react";

const Terms = () => {
  const cook = cookies()
  const user = cook.get('userEmail');
  logger.info(`${user?.value} access the Terms Page`);
  return (
    <main className="w-full bg-base-100 py-12 justify-center flex">
      <div className="container px-4 md:px-6">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Terms of Use
            </h1>
            <h4 className="text-md py-5 font-semibold tracking-tighter">
              Last updated: December 31, 2023
            </h4>
            <h2 className="text-xl py-5 font-semibold tracking-tighter">
              AGREEMENT TO OUR LEGAL TERMS
            </h2>
            <p className="mx-auto max-w-[700px]">
              We are Dintly (&ldquo;Company&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;, &ldquo;our&rdquo;), a company registered in
              India at Akruti Countrywood, Pune, Maharastra 411048.
            </p>
            <p className="mx-auto max-w-[700px]">
              We operate the website dintly.in (the &ldquo;Site&rdquo;), as well
              as any other related products and services that refer or link to
              these legal terms (the &ldquo;Legal Terms&rdquo;) (collectively,
              the &ldquo;Services&rdquo;).
            </p>
            <p className="mx-auto max-w-[700px]">
              We provide products of different categories such as Fashion,
              Electronics, Home & Furniture, Appliances, Beauty, Toys and More.
            </p>
            <p className="mx-auto max-w-[700px]">
              You can contact us by phone at +91 9860684596, email at
              support@dintly.in, or by mail to Akruti Countrywood, Pune,
              Maharastra 411048, India.
            </p>
            <p className="mx-auto max-w-[700px]">
              These Legal Terms constitute a legally binding agreement made
              between you, whether personally or on behalf of an entity
              (&ldquo;you&ldquo;), and Dintly, concerning your access to and use
              of the Services. You agree that by accessing the Services, you
              have read, understood, and agreed to be bound by all of these
              Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS,
              THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU
              MUST DISCONTINUE USE IMMEDIATELY.
            </p>
            <p className="mx-auto max-w-[700px]">
              We will provide you with prior notice of any scheduled changes to
              the Services you are using. The modified Legal Terms will become
              effective upon posting or notifying you by
              communication@dintly.com, as stated in the email message. By
              continuing to use the Services after the effective date of any
              changes, you agree to be bound by the modified terms.
            </p>
            <p className="mx-auto max-w-[700px]">
              The Services are intended for users who are at least 13 years old.
              Persons under the age of 18 are not permitted to use or register
              for the Services.
            </p>
            <p className="mx-auto max-w-[700px]">
              We recommend that you print a copy of these Legal Terms for your
              records.
            </p>
          </div>
          <div className="space-y-4">
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  OUR SERVICES
                </h2>
                <p className="p-6">
                  The information provided when using the Services is not
                  intended for distribution to or use by any person or entity in
                  any jurisdiction or country where such distribution or use
                  would be contrary to law or regulation or which would subject
                  us to any registration requirement within such jurisdiction or
                  country. Accordingly, those persons who choose to access the
                  Services from other locations do so on their own initiative
                  and are solely responsible for compliance with local laws, if
                  and to the extent local laws are applicable.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  USER REPRESENTATIONS
                </h2>
                <p className="p-6">
                  By using the Services, you represent and warrant that: (1) all
                  registration information you submit will be true, accurate,
                  current, and complete; (2) you will maintain the accuracy of
                  such information and promptly update such registration
                  information as necessary; (3) you have the legal capacity and
                  you agree to comply with these Legal Terms; (4) you are not a
                  minor in the jurisdiction in which you reside; (5) you will
                  not access the Services through automated or non-human means,
                  whether through a bot, script or otherwise; (6) you will not
                  use the Services for any illegal or unauthorized purpose; and
                  (7) your use of the Services will not violate any applicable
                  law or regulation.
                </p>
                <p className="p-6">
                  If you provide any information that is untrue, inaccurate, not
                  current, or incomplete, we have the right to suspend or
                  terminate your account and refuse any and all current or
                  future use of the Services (or any portion thereof).
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  USER REGISTRATION
                </h2>
                <p className="p-6">
                  You may be required to register to use the Services. You agree
                  to keep your password confidential and will be responsible for
                  all use of your account and password. We reserve the right to
                  remove, reclaim, or change a username you select if we
                  determine, in our sole discretion, that such username is
                  inappropriate, obscene, or otherwise objectionable.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">PRODUCTS</h2>
                <p className="p-6">
                  We make every effort to display as accurately as possible the
                  colors, features, specifications, and details of the products
                  available on the Services. However, we do not guarantee that
                  the colors, features, specifications, and details of the
                  products will be accurate, complete, reliable, current, or
                  free of other errors, and your electronic display may not
                  accurately reflect the actual colors and details of the
                  products. All products are subject to availability, and we
                  cannot guarantee that items will be in stock. We reserve the
                  right to discontinue any products at any time for any reason.
                  Prices for all products are subject to change.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  PURCHASES AND PAYMENT
                </h2>
                <p className="p-6">We accept the following forms of payment:</p>
                <ul role="list" className="list-item space-y-2 px-10 text-md">
                  <li className="px-6">
                    <span>- PhonePe</span>
                  </li>
                  <li className="px-6">
                    <span>- Razorpay</span>
                  </li>
                </ul>
                <p className="p-6">
                  You agree to provide current, complete, and accurate purchase
                  and account information for all purchases made via the
                  Services. You further agree to promptly update account and
                  payment information, including email address, payment method,
                  and payment card expiration date, so that we can complete your
                  transactions and contact you as needed. Sales tax will be
                  added to the price of purchases as deemed required by us. We
                  may change prices at any time. All payments shall be in Indian
                  rupees (INR).
                </p>
                <p className="p-6">
                  You agree to pay all charges at the prices then in effect for
                  your purchases and any applicable shipping fees, and you
                  authorize us to charge your chosen payment provider for any
                  such amounts upon placing your order. We reserve the right to
                  correct any errors or mistakes in pricing, even if we have
                  already requested or received payment.
                </p>
                <p className="p-6">
                  We reserve the right to refuse any order placed through the
                  Services. We may, in our sole discretion, limit or cancel
                  quantities purchased per person, per household, or per order.
                  These restrictions may include orders placed by or under the
                  same customer account, the same payment method, and/or orders
                  that use the same billing or shipping address. We reserve the
                  right to limit or prohibit orders that, in our sole judgment,
                  appear to be placed by dealers, resellers, or distributors.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  RETURN POLICY
                </h2>
                <p className="p-6">
                  Please review our {" "}
                  <a
                    href="/policies/refundreturn"
                    className="link link-primary"
                  >
                   Refund & Return Policy
                  </a>
                  {" "}posted on the Services prior to making any purchases.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  PROHIBITED ACTIVITIES
                </h2>
                <p className="p-6">
                  You may not access or use the Services for any purpose other
                  than that for which we make the Services available. The
                  Services may not be used in connection with any commercial
                  endeavors except those that are specifically endorsed or
                  approved by us.
                </p>
                <p className="p-6">
                  As a user of the Services, you agree not to:
                </p>
                <ul role="list" className="list-disc space-y-2 px-10 text-md">
                  <li className="px-6">
                    <span>
                      Systematically retrieve data or other content from the
                      Services to create or compile, directly or indirectly, a
                      collection, compilation, database, or directory without
                      written permission from us.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Trick, defraud, or mislead us and other users, especially
                      in any attempt to learn sensitive account information such
                      as user passwords.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Circumvent, disable, or otherwise interfere with
                      security-related features of the Services, including
                      features that prevent or restrict the use or copying of
                      any Content or enforce limitations on the use of the
                      Services and/or the Content contained therein.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Disparage, tarnish, or otherwise harm, in our opinion, us
                      and/or the Services.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Use any information obtained from the Services in order to
                      harass, abuse, or harm another person.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Make improper use of our support services or submit false
                      reports of abuse or misconduct.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Use the Services in a manner inconsistent with any
                      applicable laws or regulations.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Engage in unauthorized framing of or linking to the
                      Services.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Upload or transmit (or attempt to upload or to transmit)
                      viruses, Trojan horses, or other material, including
                      excessive use of capital letters and spamming (continuous
                      posting of repetitive text), that interferes with any
                      party’s uninterrupted use and enjoyment of the Services or
                      modifies, impairs, disrupts, alters, or interferes with
                      the use, features, functions, operation, or maintenance of
                      the Services.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Engage in any automated use of the system, such as using
                      scripts to send comments or messages, or using any data
                      mining, robots, or similar data gathering and extraction
                      tools.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Delete the copyright or other proprietary rights notice
                      from any Content.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Attempt to impersonate another user or person or use the
                      username of another user.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Upload or transmit (or attempt to upload or to transmit)
                      any material that acts as a passive or active information
                      collection or transmission mechanism, including without
                      limitation, clear graphics interchange formats
                      (&ldquo;gifs&rdquo;), 1x1 pixels, web bugs, cookies, or
                      other similar devices (sometimes referred to as
                      &ldquo;spyware&rdquo; or &ldquo;passive collection
                      mechanisms&rdquo; or &ldquo;pcms&rdquo;).
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Interfere with, disrupt, or create an undue burden on the
                      Services or the networks or services connected to the
                      Services.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Harass, annoy, intimidate, or threaten any of our
                      employees or agents engaged in providing any portion of
                      the Services to you.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Attempt to bypass any measures of the Services designed to
                      prevent or restrict access to the Services, or any portion
                      of the Services.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Copy or adapt the Services&lsquo; software, including but
                      not limited to Flash, PHP, HTML, JavaScript, or other
                      code.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Except as permitted by applicable law, decipher,
                      decompile, disassemble, or reverse engineer any of the
                      software comprising or in any way making up a part of the
                      Services.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Except as may be the result of standard search engine or
                      Internet browser usage, use, launch, develop, or
                      distribute any automated system, including without
                      limitation, any spider, robot, cheat utility, scraper, or
                      offline reader that accesses the Services, or use or
                      launch any unauthorized script or other software.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Use a buying agent or purchasing agent to make purchases
                      on the Services.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Make any unauthorized use of the Services, including
                      collecting usernames and/or email addresses of users by
                      electronic or other means for the purpose of sending
                      unsolicited email, or creating user accounts by automated
                      means or under false pretenses.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Use the Services as part of any effort to compete with us
                      or otherwise use the Services and/or the Content for any
                      revenue-generating endeavor or commercial enterprise.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Use the Services to advertise or offer to sell goods and
                      services.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>Sell or otherwise transfer your profile.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  USER GENERATED CONTRIBUTIONS
                </h2>
                <p className="p-6">
                  The Services may invite you to chat, contribute to, or
                  participate in blogs, message boards, online forums, and other
                  functionality, and may provide you with the opportunity to
                  create, submit, post, display, transmit, perform, publish,
                  distribute, or broadcast content and materials to us or on the
                  Services, including but not limited to text, writings, video,
                  audio, photographs, graphics, comments, suggestions, or
                  personal information or other material (collectively,
                  &ldquo;Contributions&rdquo;). Contributions may be viewable by
                  other users of the Services and through third-party websites.
                  As such, any Contributions you transmit may be treated as
                  non-confidential and non-proprietary. When you create or make
                  available any Contributions, you thereby represent and warrant
                  that:
                </p>
                <ul role="list" className="list-disc space-y-2 px-10 text-md">
                  <li className="px-6">
                    <span>
                      The creation, distribution, transmission, public display,
                      or performance, and the accessing, downloading, or copying
                      of your Contributions do not and will not infringe the
                      proprietary rights, including but not limited to the
                      copyright, patent, trademark, trade secret, or moral
                      rights of any third party.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      You are the creator and owner of or have the necessary
                      licenses, rights, consents, releases, and permissions to
                      use and to authorize us, the Services, and other users of
                      the Services to use your Contributions in any manner
                      contemplated by the Services and these Legal Terms.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      You have the written consent, release, and/or permission
                      of each and every identifiable individual person in your
                      Contributions to use the name or likeness of each and
                      every such identifiable individual person to enable
                      inclusion and use of your Contributions in any manner
                      contemplated by the Services and these Legal Terms.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Your Contributions are not false, inaccurate, or
                      misleading.
                    </span>
                  </li>{" "}
                  <li className="px-6">
                    <span>
                      Your Contributions are not unsolicited or unauthorized
                      advertising, promotional materials, pyramid schemes, chain
                      letters, spam, mass mailings, or other forms of
                      solicitation.
                    </span>
                  </li>{" "}
                  <li className="px-6">
                    <span>
                      Your Contributions are not obscene, lewd, lascivious,
                      filthy, violent, harassing, libelous, slanderous, or
                      otherwise objectionable (as determined by us).
                    </span>
                  </li>{" "}
                  <li className="px-6">
                    <span>
                      Your Contributions do not ridicule, mock, disparage,
                      intimidate, or abuse anyone.
                    </span>
                  </li>{" "}
                  <li className="px-6">
                    <span>
                      Your Contributions are not used to harass or threaten (in
                      the legal sense of those terms) any other person and to
                      promote violence against a specific person or class of
                      people.
                    </span>
                  </li>{" "}
                  <li className="px-6">
                    <span>
                      Your Contributions do not violate any applicable law,
                      regulation, or rule.
                    </span>
                  </li>{" "}
                  <li className="px-6">
                    <span>
                      Your Contributions do not violate the privacy or publicity
                      rights of any third party.
                    </span>
                  </li>{" "}
                  <li className="px-6">
                    <span>
                      Your Contributions do not violate any applicable law
                      concerning child pornography, or otherwise intended to
                      protect the health or well-being of minors.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Your Contributions do not include any offensive comments
                      that are connected to race, national origin, gender,
                      sexual preference, or physical handicap.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Your Contributions do not otherwise violate, or link to
                      material that violates, any provision of these Legal
                      Terms, or any applicable law or regulation.
                    </span>
                  </li>
                </ul>
                <p className="p-6">
                  Any use of the Services in violation of the foregoing violates
                  these Legal Terms and may result in, among other things,
                  termination or suspension of your rights to use the Services.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  CONTRIBUTION LICENSE
                </h2>
                <p className="p-6">
                  By posting your Contributions to any part of the Services or
                  making Contributions accessible to the Services by linking
                  your account from the Services to any of your social
                  networking accounts, you automatically grant, and you
                  represent and warrant that you have the right to grant, to us
                  an unrestricted, unlimited, irrevocable, perpetual,
                  non-exclusive, transferable, royalty-free, fully-paid,
                  worldwide right, and license to host, use, copy, reproduce,
                  disclose, sell, resell, publish, broadcast, retitle, archive,
                  store, cache, publicly perform, publicly display, reformat,
                  translate, transmit, excerpt (in whole or in part), and
                  distribute such Contributions (including, without limitation,
                  your image and voice) for any purpose, commercial,
                  advertising, or otherwise, and to prepare derivative works of,
                  or incorporate into other works, such Contributions, and grant
                  and authorize sublicenses of the foregoing. The use and
                  distribution may occur in any media formats and through any
                  media channels.
                </p>
                <p className="p-6">
                  This license will apply to any form, media, or technology now
                  known or hereafter developed, and includes our use of your
                  name, company name, and franchise name, as applicable, and any
                  of the trademarks, service marks, trade names, logos, and
                  personal and commercial images you provide. You waive all
                  moral rights in your Contributions, and you warrant that moral
                  rights have not otherwise been asserted in your Contributions.
                </p>
                <p className="p-6">
                  We do not assert any ownership over your Contributions. You
                  retain full ownership of all of your Contributions and any
                  intellectual property rights or other proprietary rights
                  associated with your Contributions. We are not liable for any
                  statements or representations in your Contributions provided
                  by you in any area on the Services. You are solely responsible
                  for your Contributions to the Services and you expressly agree
                  to exonerate us from any and all responsibility and to refrain
                  from any legal action against us regarding your Contributions.
                </p>
                <p className="p-6">
                  We have the right, in our sole and absolute discretion, (1) to
                  edit, redact, or otherwise change any Contributions; (2) to
                  re-categorize any Contributions to place them in more
                  appropriate locations on the Services; and (3) to pre-screen
                  or delete any Contributions at any time and for any reason,
                  without notice. We have no obligation to monitor your
                  Contributions.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  GUIDELINES FOR REVIEWS
                </h2>
                <p className="p-6">
                  We may provide you areas on the Services to leave reviews or
                  ratings. When posting a review, you must comply with the
                  following criteria: (1) you should have firsthand experience
                  with the person/entity being reviewed; (2) your reviews should
                  not contain offensive profanity, or abusive, racist,
                  offensive, or hateful language; (3) your reviews should not
                  contain discriminatory references based on religion, race,
                  gender, national origin, age, marital status, sexual
                  orientation, or disability; (4) your reviews should not
                  contain references to illegal activity; (5) you should not be
                  affiliated with competitors if posting negative reviews; (6)
                  you should not make any conclusions as to the legality of
                  conduct; (7) you may not post any false or misleading
                  statements; and (8) you may not organize a campaign
                  encouraging others to post reviews, whether positive or
                  negative.
                </p>
                <p className="p-6">
                  We may accept, reject, or remove reviews in our sole
                  discretion. We have absolutely no obligation to screen reviews
                  or to delete reviews, even if anyone considers reviews
                  objectionable or inaccurate. Reviews are not endorsed by us,
                  and do not necessarily represent our opinions or the views of
                  any of our affiliates or partners. We do not assume liability
                  for any review or for any claims, liabilities, or losses
                  resulting from any review. By posting a review, you hereby
                  grant to us a perpetual, non-exclusive, worldwide,
                  royalty-free, fully paid, assignable, and sublicensable right
                  and license to reproduce, modify, translate, transmit by any
                  means, display, perform, and/or distribute all content
                  relating to review.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  SOCIAL MEDIA
                </h2>
                <p className="p-6">
                  As part of the functionality of the Services, you may link
                  your account with online accounts you have with third-party
                  service providers (each such account, a &ldquo;Third-Party
                  Account&rdquo;) by either: (1) providing your Third-Party
                  Account login information through the Services; or (2)
                  allowing us to access your Third-Party Account, as is
                  permitted under the applicable terms and conditions that
                  govern your use of each Third-Party Account. You represent and
                  warrant that you are entitled to disclose your Third-Party
                  Account login information to us and/or grant us access to your
                  Third-Party Account, without breach by you of any of the terms
                  and conditions that govern your use of the applicable
                  Third-Party Account, and without obligating us to pay any fees
                  or making us subject to any usage limitations imposed by the
                  third-party service provider of the Third-Party Account. By
                  granting us access to any Third-Party Accounts, you understand
                  that (1) we may access, make available, and store (if
                  applicable) any content that you have provided to and stored
                  in your Third-Party Account (the &ldquo;Social Network
                  Content&rdquo;) so that it is available on and through the
                  Services via your account, including without limitation any
                  friend lists and (2) we may submit to and receive from your
                  Third-Party Account additional information to the extent you
                  are notified when you link your account with the Third-Party
                  Account. Depending on the Third-Party Accounts you choose and
                  subject to the privacy settings that you have set in such
                  Third-Party Accounts, personally identifiable information that
                  you post to your Third-Party Accounts may be available on and
                  through your account on the Services. Please note that if a
                  Third-Party Account or associated service becomes unavailable
                  or our access to such Third-Party Account is terminated by the
                  third-party service provider, then Social Network Content may
                  no longer be available on and through the Services. You will
                  have the ability to disable the connection between your
                  account on the Services and your Third-Party Accounts at any
                  time. PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE THIRD-PARTY
                  SERVICE PROVIDERS ASSOCIATED WITH YOUR THIRD-PARTY ACCOUNTS IS
                  GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH SUCH THIRD-PARTY
                  SERVICE PROVIDERS. We make no effort to review any Social
                  Network Content for any purpose, including but not limited to,
                  for accuracy, legality, or non-infringement, and we are not
                  responsible for any Social Network Content. You acknowledge
                  and agree that we may access your email address book
                  associated with a Third-Party Account and your contacts list
                  stored on your mobile device or tablet computer solely for
                  purposes of identifying and informing you of those contacts
                  who have also registered to use the Services. You can
                  deactivate the connection between the Services and your
                  Third-Party Account by contacting us using the contact
                  information below or through your account settings (if
                  applicable). We will attempt to delete any information stored
                  on our servers that was obtained through such Third-Party
                  Account, except the username and profile picture that become
                  associated with your account.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  THIRD-PARTY WEBSITES AND CONTENT
                </h2>
                <p className="p-6">
                  The Services may contain (or you may be sent via the Site)
                  links to other websites (&ldquo;Third-Party Websites&ldquo;)
                  as well as articles, photographs, text, graphics, pictures,
                  designs, music, sound, video, information, applications,
                  software, and other content or items belonging to or
                  originating from third parties (&ldquo;Third-Party
                  Content&ldquo;). Such Third-Party Websites and Third-Party
                  Content are not investigated, monitored, or checked for
                  accuracy, appropriateness, or completeness by us, and we are
                  not responsible for any Third-Party Websites accessed through
                  the Services or any Third-Party Content posted on, available
                  through, or installed from the Services, including the
                  content, accuracy, offensiveness, opinions, reliability,
                  privacy practices, or other policies of or contained in the
                  Third-Party Websites or the Third-Party Content. Inclusion of,
                  linking to, or permitting the use or installation of any
                  Third-Party Websites or any Third-Party Content does not imply
                  approval or endorsement thereof by us. If you decide to leave
                  the Services and access the Third-Party Websites or to use or
                  install any Third-Party Content, you do so at your own risk,
                  and you should be aware these Legal Terms no longer govern.
                  You should review the applicable terms and policies, including
                  privacy and data gathering practices, of any website to which
                  you navigate from the Services or relating to any applications
                  you use or install from the Services. Any purchases you make
                  through Third-Party Websites will be through other websites
                  and from other companies, and we take no responsibility
                  whatsoever in relation to such purchases which are exclusively
                  between you and the applicable third party. You agree and
                  acknowledge that we do not endorse the products or services
                  offered on Third-Party Websites and you shall hold us
                  blameless from any harm caused by your purchase of such
                  products or services. Additionally, you shall hold us
                  blameless from any losses sustained by you or harm caused to
                  you relating to or resulting in any way from any Third-Party
                  Content or any contact with Third-Party Websites.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  SERVICES MANAGEMENT
                </h2>
                <p className="p-6">
                  We reserve the right, but not the obligation, to: (1) monitor
                  the Services for violations of these Legal Terms; (2) take
                  appropriate legal action against anyone who, in our sole
                  discretion, violates the law or these Legal Terms, including
                  without limitation, reporting such user to law enforcement
                  authorities; (3) in our sole discretion and without
                  limitation, refuse, restrict access to, limit the availability
                  of, or disable (to the extent technologically feasible) any of
                  your Contributions or any portion thereof; (4) in our sole
                  discretion and without limitation, notice, or liability, to
                  remove from the Services or otherwise disable all files and
                  content that are excessive in size or are in any way
                  burdensome to our systems; and (5) otherwise manage the
                  Services in a manner designed to protect our rights and
                  property and to facilitate the proper functioning of the
                  Services.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  PRIVACY POLICY
                </h2>
                <p className="p-6">
                  We care about data privacy and security. Please review our{" "}
                  <a
                    href="/policies/privacypolicy"
                    className="link link-primary"
                  >
                    Privacy Policy
                  </a>
                  {" "}By using the Services, you agree to be bound by our Privacy
                  Policy, which is incorporated into these Legal Terms. Please
                  be advised the Services are hosted in India. If you access the
                  Services from any other region of the world with laws or other
                  requirements governing personal data collection, use, or
                  disclosure that differ from applicable laws in India, then
                  through your continued use of the Services, you are
                  transferring your data to India, and you expressly consent to
                  have your data transferred to and processed in India.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  COPYRIGHT INFRINGEMENTS
                </h2>
                <p className="p-6">
                  We respect the intellectual property rights of others. If you
                  believe that any material available on or through the Services
                  infringes upon any copyright you own or control, please
                  immediately notify us using the contact information provided
                  below (a &ldquo;Notification&ldquo;). A copy of your
                  Notification will be sent to the person who posted or stored
                  the material addressed in the Notification. Please be advised
                  that pursuant to applicable law you may be held liable for
                  damages if you make material misrepresentations in a
                  Notification. Thus, if you are not sure that material located
                  on or linked to by the Services infringes your copyright, you
                  should consider first contacting an attorney.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  TERM AND TERMINATION
                </h2>
                <p className="p-6">
                  These Legal Terms shall remain in full force and effect while
                  you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF
                  THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE
                  DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND
                  USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES),
                  TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING
                  WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY,
                  OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY
                  APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR
                  PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY
                  CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT
                  WARNING, IN OUR SOLE DISCRETION.
                </p>
                <p className="p-6">
                  If we terminate or suspend your account for any reason, you
                  are prohibited from registering and creating a new account
                  under your name, a fake or borrowed name, or the name of any
                  third party, even if you may be acting on behalf of the third
                  party. In addition to terminating or suspending your account,
                  we reserve the right to take appropriate legal action,
                  including without limitation pursuing civil, criminal, and
                  injunctive redress.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  MODIFICATIONS AND INTERRUPTIONS
                </h2>
                <p className="p-6">
                  We reserve the right to change, modify, or remove the contents
                  of the Services at any time or for any reason at our sole
                  discretion without notice. However, we have no obligation to
                  update any information on our Services. We also reserve the
                  right to modify or discontinue all or part of the Services
                  without notice at any time. We will not be liable to you or
                  any third party for any modification, price change,
                  suspension, or discontinuance of the Services.
                </p>
                <p className="p-6">
                  We cannot guarantee the Services will be available at all
                  times. We may experience hardware, software, or other problems
                  or need to perform maintenance related to the Services,
                  resulting in interruptions, delays, or errors. We reserve the
                  right to change, revise, update, suspend, discontinue, or
                  otherwise modify the Services at any time or for any reason
                  without notice to you. You agree that we have no liability
                  whatsoever for any loss, damage, or inconvenience caused by
                  your inability to access or use the Services during any
                  downtime or discontinuance of the Services. Nothing in these
                  Legal Terms will be construed to obligate us to maintain and
                  support the Services or to supply any corrections, updates, or
                  releases in connection therewith.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  GOVERNING LAW
                </h2>
                <p className="p-6">
                  These Legal Terms shall be governed by and defined following
                  the laws of India. Dintly and yourself irrevocably consent
                  that the courts of India shall have exclusive jurisdiction to
                  resolve any dispute which may arise in connection with these
                  Legal Terms.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  DISPUTE RESOLUTION
                </h2>
                <div>
                  <h2 className="px-6 text-md font-semibold">
                    Informal Negotiations
                  </h2>
                  <p className="px-6">
                    To expedite resolution and control the cost of any dispute,
                    controversy, or claim related to these Legal Terms (each a
                    &ldquo;Dispute&rdquo; and collectively, the
                    &ldquo;Disputes&rdquo;) brought by either you or us
                    (individually, a &ldquo;Party&rdquo; and collectively, the
                    &ldquo;Parties&rdquo;), the Parties agree to first attempt
                    to negotiate any Dispute (except those Disputes expressly
                    provided below) informally for at least thirty (30) days
                    before initiating arbitration. Such informal negotiations
                    commence upon written notice from one Party to the other
                    Party.
                  </p>
                </div>
                <div>
                  <h2 className="px-6 text-md font-semibold">
                    Binding Arbitration
                  </h2>
                  <p className="px-6">
                    Any dispute arising out of or in connection with these Legal
                    Terms, including any question regarding its existence,
                    validity, or termination, shall be referred to and finally
                    resolved by the International Commercial Arbitration Court
                    under the European Arbitration Chamber (Belgium, Brussels,
                    Avenue Louise, 146) according to the Rules of this ICAC,
                    which, as a result of referring to it, is considered as the
                    part of this clause. The number of arbitrators shall be two
                    (2). The seat, or legal place, or arbitration shall be Pune,
                    India. The language of the proceedings shall be English. The
                    governing law of these Legal Terms shall be substantive law
                    of India.
                  </p>
                </div>
                <div>
                  <h2 className="px-6 text-md font-semibold">Restrictions</h2>
                  <p className="px-6">
                    The Parties agree that any arbitration shall be limited to
                    the Dispute between the Parties individually. To the full
                    extent permitted by law, (a) no arbitration shall be joined
                    with any other proceeding; (b) there is no right or
                    authority for any Dispute to be arbitrated on a class-action
                    basis or to utilize class action procedures; and (c) there
                    is no right or authority for any Dispute to be brought in a
                    purported representative capacity on behalf of the general
                    public or any other persons.
                  </p>
                </div>
                <div>
                  <h2 className="px-6 text-md font-semibold">
                    Exceptions to Informal Negotiations and Arbitration
                  </h2>
                  <p className="px-6">
                    The Parties agree that the following Disputes are not
                    subject to the above provisions concerning informal
                    negotiations binding arbitration: (a) any Disputes seeking
                    to enforce or protect, or concerning the validity of, any of
                    the intellectual property rights of a Party; (b) any Dispute
                    related to, or arising from, allegations of theft, piracy,
                    invasion of privacy, or unauthorized use; and (c) any claim
                    for injunctive relief. If this provision is found to be
                    illegal or unenforceable, then neither Party will elect to
                    arbitrate any Dispute falling within that portion of this
                    provision found to be illegal or unenforceable and such
                    Dispute shall be decided by a court of competent
                    jurisdiction within the courts listed for jurisdiction
                    above, and the Parties agree to submit to the personal
                    jurisdiction of that court.
                  </p>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  CORRECTIONS
                </h2>
                <p className="p-6">
                  There may be information on the Services that contains
                  typographical errors, inaccuracies, or omissions, including
                  descriptions, pricing, availability, and various other
                  information. We reserve the right to correct any errors,
                  inaccuracies, or omissions and to change or update the
                  information on the Services at any time, without prior notice.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  DISCLAIMER
                </h2>
                <p className="p-6">
                  THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS.
                  YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE
                  RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL
                  WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE
                  SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION,
                  THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                  PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO
                  WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR
                  COMPLETENESS OF THE SERVICE&apos;S CONTENT OR THE CONTENT OF
                  ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND
                  WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1)
                  ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS,
                  (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE
                  WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE
                  SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE
                  SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR
                  FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR
                  CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY
                  BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE
                  TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY,
                  AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND
                  MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A
                  RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR
                  OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT,
                  ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT
                  OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE
                  SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE
                  APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND
                  WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR
                  MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY
                  PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A
                  PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT,
                  YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE
                  APPROPRIATE.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  LIMITATIONS OF LIABILITY
                </h2>
                <p className="p-6">
                  IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE
                  LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT,
                  CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE
                  DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR
                  OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF
                  WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  INDEMNIFICATION
                </h2>
                <p className="p-6">
                  You agree to defend, indemnify, and hold us harmless,
                  including our subsidiaries, affiliates, and all of our
                  respective officers, agents, partners, and employees, from and
                  against any loss, damage, liability, claim, or demand,
                  including reasonable attorneys’ fees and expenses, made by any
                  third party due to or arising out of: (1) your Contributions;
                  (2) use of the Services; (3) breach of these Legal Terms; (4)
                  any breach of your representations and warranties set forth in
                  these Legal Terms; (5) your violation of the rights of a third
                  party, including but not limited to intellectual property
                  rights; or (6) any overt harmful act toward any other user of
                  the Services with whom you connected via the Services.
                  Notwithstanding the foregoing, we reserve the right, at your
                  expense, to assume the exclusive defense and control of any
                  matter for which you are required to indemnify us, and you
                  agree to cooperate, at your expense, with our defense of such
                  claims. We will use reasonable efforts to notify you of any
                  such claim, action, or proceeding which is subject to this
                  indemnification upon becoming aware of it.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  USER DATA
                </h2>
                <p className="p-6">
                  We will maintain certain data that you transmit to the
                  Services for the purpose of managing the performance of the
                  Services, as well as data relating to your use of the
                  Services. Although we perform regular routine backups of data,
                  you are solely responsible for all data that you transmit or
                  that relates to any activity you have undertaken using the
                  Services. You agree that we shall have no liability to you for
                  any loss or corruption of any such data, and you hereby waive
                  any right of action against us arising from any such loss or
                  corruption of such data.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
                </h2>
                <p className="p-6">
                  Visiting the Services, sending us emails, and completing
                  online forms constitute electronic communications. You consent
                  to receive electronic communications, and you agree that all
                  agreements, notices, disclosures, and other communications we
                  provide to you electronically, via email and on the Services,
                  satisfy any legal requirement that such communication be in
                  writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES,
                  CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC
                  DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS
                  INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby
                  waive any rights or requirements under any statutes,
                  regulations, rules, ordinances, or other laws in any
                  jurisdiction which require an original signature or delivery
                  or retention of non-electronic records, or to payments or the
                  granting of credits by any means other than electronic means.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  MISCELLANEOUS
                </h2>
                <p className="p-6">
                  These Legal Terms and any policies or operating rules posted
                  by us on the Services or in respect to the Services constitute
                  the entire agreement and understanding between you and us. Our
                  failure to exercise or enforce any right or provision of these
                  Legal Terms shall not operate as a waiver of such right or
                  provision. These Legal Terms operate to the fullest extent
                  permissible by law. We may assign any or all of our rights and
                  obligations to others at any time. We shall not be responsible
                  or liable for any loss, damage, delay, or failure to act
                  caused by any cause beyond our reasonable control. If any
                  provision or part of a provision of these Legal Terms is
                  determined to be unlawful, void, or unenforceable, that
                  provision or part of the provision is deemed severable from
                  these Legal Terms and does not affect the validity and
                  enforceability of any remaining provisions. There is no joint
                  venture, partnership, employment or agency relationship
                  created between you and us as a result of these Legal Terms or
                  use of the Services. You agree that these Legal Terms will not
                  be construed against us by virtue of having drafted them. You
                  hereby waive any and all defenses you may have based on the
                  electronic form of these Legal Terms and the lack of signing
                  by the parties hereto to execute these Legal Terms.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className=" card-title px-6 text-xl font-bold">
                  CONTACT US
                </h2>
                <p className="p-6">
                  In order to resolve a complaint regarding the Services or to
                  receive further information regarding use of the Services,
                  please contact us at:
                </p>
                <p className="px-6">
                  Dintly Private Limited.
                </p>
                <p className="px-6">
                  Akruti Countrywoods
                </p>
                <p className="px-6">
                Pune, Maharastra 411048
                </p>
                <p className="px-6">
                India
                </p>
                <p className="px-6">
                Phone: +91 9860684596
                </p>
                <p className="px-6">
                support@dintly.in
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Terms;
