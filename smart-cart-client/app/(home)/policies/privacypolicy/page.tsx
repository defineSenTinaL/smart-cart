import logger from "@/libs/logger";
import { cookies } from "next/headers";
import React from "react";

const PrivacyPolicy = () => {
  const cook = cookies()
  const user = cook.get('userEmail');
  logger.info(`${user?.value} access the Privacy Page`);
  return (
    <main className="w-full bg-base-100 py-12 justify-center flex">
      <div className="container px-4 md:px-6">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>
            <h4 className="text-md py-5 font-semibold tracking-tighter">
              Last updated: December 31, 2023
            </h4>
            <p className="mx-auto max-w-[700px] pb-5">
              This Privacy Policy describes Our policies and procedures on the
              collection, use and disclosure of Your information when You use
              the Service and tells You about Your privacy rights and how the
              law protects You. We use Your Personal data to provide and improve
              the Service. By using the Service, you agree to the collection and
              use of information in accordance with this Privacy Policy.
            </p>
          </div>
          <div className="space-y-10">
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h1 className=" card-title px-6 py-5 text-xl font-bold">
                  Interpretation and Definitions
                </h1>
                <h2 className="px-6 text-md font-semibold">Interpretation</h2>
                <p className="px-6">
                  The words of which the initial letter is capitalized have
                  meanings defined under the following conditions. The following
                  definitions shall have the same meaning regardless of whether
                  they appear in singular or in plural.
                </p>
                <h2 className="px-6 text-md font-semibold pt-5">Definitions </h2>
                <p className="px-6">
                  For the purposes of this Privacy Policy:{" "}
                </p>
                <ul role="list" className="list-disc space-y-2 px-10 text-md">
                  <li className="px-6">
                    <span>
                      Account means a unique account created for You to access
                      our Service or parts of our Service.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Affiliate means an entity that controls, is controlled by
                      or is under common control with a party, where
                      &ldquo;control&ldquo; means ownership of 50% or more of
                      the shares, equity interest or other securities entitled
                      to vote for election of directors or other managing
                      authority.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Company (referred to as either &ldquo;the Company&rdquo;,
                      &ldquo;We&rdquo;, &ldquo;Us&rdquo; or &ldquo;Our&rdquo; in
                      this Agreement) refers to Dintly Private Limited,
                      Akruti Countrywoods, Pune - 411048.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Cookies are small files that are placed on Your computer,
                      mobile device or any other device by a website, containing
                      the details of Your browsing history on that website among
                      its many uses. Country refers to: India
                    </span>
                  </li>
                  <li className="px-6">
                    <span>Country refers to: India</span>
                  </li>
                  <li className="px-6">
                    <span>
                      Device means any device that can access the Service such
                      as a computer, a cell phone or a digital tablet.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Personal Data is any information that relates to an
                      identified or identifiable individual.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>Service refers to the Website.</span>
                  </li>
                  <li className="px-6">
                    <span>
                      Service Provider means any natural or legal person who
                      processes the data on behalf of the Company. It refers to
                      third-party companies or individuals employed by the
                      Company to facilitate the Service, to provide the Service
                      on behalf of the Company, to perform services related to
                      the Service or to assist the Company in analysing how the
                      Service is used.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Third-party Social Media Service refers to any website or
                      any social network website through which a User can log in
                      or create an account to use the Service.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Usage Data refers to data collected automatically, either
                      generated by the use of the Service or from the Service
                      infrastructure itself (for example, the duration of a page
                      visit).
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Website refers to Dintly, accessible from dintly.in
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      You mean the individual accessing or using the Service, or
                      the company, or other legal entity on behalf of which such
                      individual is accessing or using the Service, as
                      applicable.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h1 className=" card-title px-6 text-xl font-bold">
                  Collecting and Using Your Personal Data
                </h1>
                <h2 className="px-6 text-md font-semibold">
                  Types of Data Collected{" "}
                </h2>
                <h3 className="px-6 text-md font-semibold">Personal Data </h3>
                <p className="px-6">
                  While using Our Service, we may ask You to provide Us with
                  certain personally identifiable information that can be used
                  to contact or identify You. Personally identifiable
                  information may include, but is not limited to:
                </p>
                <ul role="list" className="list-disc space-y-2 px-10 text-md">
                  <li className="px-6">
                    <span>Email address</span>
                  </li>
                  <li className="px-6">
                    <span>First name and last name</span>
                  </li>
                  <li className="px-6">
                    <span>Phone number</span>
                  </li>
                  <li className="px-6">
                    <span>Address, State, Province, ZIP/Postal code, City</span>
                  </li>
                  <li className="px-6">
                    <span>Usage Data </span>
                  </li>
                </ul>
                <h3 className="px-6 text-md font-semibold">Usage Data </h3>
                <p className="px-6">
                  Usage Data is collected automatically when using the Service.
                </p>
                <p className="px-6">
                  Usage Data may include information such as Your Device&apos;s
                  Internet Protocol address (e.g. IP address), browser type,
                  browser version, the pages of our Service that You visit, the
                  time and date of Your visit, the time spent on those pages,
                  unique device identifiers and other diagnostic data.
                </p>
                <p className="px-6">
                  When You access the Service by or through a mobile device, We
                  may collect certain information automatically, including, but
                  not limited to, the type of mobile device You use, Your mobile
                  device unique ID, the IP address of Your mobile device, Your
                  mobile operating system, the type of mobile Internet browser
                  You use, unique device identifiers and other diagnostic data.
                </p>
                <p className="px-6">
                  We may also collect information that Your browser sends
                  whenever You visit our Service or when You access the Service
                  by or through a mobile device.
                </p>
                <h3 className="px-6 text-md font-semibold">
                  Information from Third-Party Social Media Services{" "}
                </h3>
                <p className="px-6">
                  The Company allows You to create an account and log in to use
                  the Service through the following Third-party Social Media
                  Services:
                </p>
                <ul role="list" className="list-disc space-y-2 px-10 text-md">
                  <li className="px-6">
                    <span>Google </span>
                  </li>
                </ul>
                <p className="px-6">
                  If You decide to register through or otherwise grant us access
                  to a Third-Party Social Media Service, we may collect Personal
                  data that is already associated with Your Third-Party Social
                  Media Service&apos;s account, such as Your name, Your email
                  address and your profile.
                </p>
                <p className="px-6">
                  You may also have the option of sharing additional information
                  with the Company through Your Third-Party Social Media
                  Service&apos;s account. If You choose to provide such
                  information and Personal Data, during registration or
                  otherwise, you are giving the Company permission to use,
                  share, and store it in a manner consistent with this Privacy
                  Policy.
                </p>
                <h3 className="px-6 text-md font-semibold">
                  Tracking Technologies and Cookies
                </h3>
                <p className="px-6">
                  We use Cookies and similar tracking technologies to track the
                  activity on Our Service and store certain information.
                  Tracking technologies used are beacons, tags, and scripts to
                  collect and track information and to improve and analyze Our
                  Service. The technologies We use may include:
                </p>
                <ul role="list" className="list-disc space-y-2 px-10 text-md">
                  <li className="px-6">
                    <span>
                      Cookies or Browser Cookies. A cookie is a small file
                      placed on Your Device. You can instruct Your browser to
                      refuse all Cookies or to indicate when a Cookie is being
                      sent. However, if You do not accept Cookies, you may not
                      be able to use some parts of our Service. Unless you have
                      adjusted Your browser setting so that it will refuse
                      Cookies, our Service may use Cookies.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Web Beacons. Certain sections of our Service and our
                      emails may contain small electronic files known as web
                      beacons (also referred to as clear gifs, pixel tags, and
                      single-pixel gifs) that permit the Company, for example,
                      to count users who have visited those pages or opened an
                      email and for other related website statistics (for
                      example, recording the popularity of a certain section and
                      verifying system and server integrity).
                    </span>
                  </li>
                </ul>
                <p className="px-6">
                  Cookies can be &ldquo;Persistent&ldquo; or
                  &ldquo;Session&ldquo; Cookies. Persistent Cookies remain on
                  Your personal computer or mobile device when You go offline,
                  while Session Cookies are deleted as soon as You close Your
                  web browser.
                </p>
                <p className="px-6">
                  We use both Session and Persistent Cookies for the purposes
                  set out below:
                </p>
                <ul role="list" className="list-disc space-y-2 px-10 text-md">
                  <li className="px-6">
                    <span>Necessary / Essential Cookies</span>
                  </li>
                  <p className="px-6">Type: Session Cookies</p>
                  <p className="px-6">Administered by: Us</p>
                  <p className="px-6">
                    Purpose: These Cookies are essential to provide You with
                    services available through the Website and to enable You to
                    use some of its features. They help to authenticate users
                    and prevent fraudulent use of user accounts. Without these
                    Cookies, the services that You have asked for cannot be
                    provided, and We only use these Cookies to provide You with
                    those services.
                  </p>
                  <li className="px-6">
                    <span>Cookies Policy / Notice Acceptance Cookies</span>
                    <p className="px-6">Type: Persistent Cookies </p>
                    <p className="px-6">Administered by: Us </p>
                    <p className="px-6">
                      Purpose: These Cookies identify if users have accepted the
                      use of cookies on the Website.{" "}
                    </p>
                  </li>
                  <li className="px-6">
                    <span>Functionality Cookies</span>
                    <p className="px-6">Type: Persistent Cookies</p>
                    <p className="px-6">Administered by: Us</p>
                    <p className="px-6">
                      Purpose: These Cookies allow us to remember choices You
                      make when You use the Website, such as remembering your
                      login details, language preference and items in your cart.
                      The purpose of these Cookies is to provide You with a more
                      personal experience and to avoid You having to re-enter
                      your preferences every time You use the Website.{" "}
                    </p>
                  </li>
                </ul>
                <h3 className="px-6 text-md font-semibold">
                  Use of Your Personal Data
                </h3>
                <p className="px-6">
                  The Company may use Personal Data for the following purposes:
                </p>
                <p className="px-6">
                  To provide and maintain our Service, including to monitor the
                  usage of our Service.
                </p>
                <ul role="list" className="list-disc space-y-2 px-10 text-md">
                  <li className="px-6">
                    <span>
                      To manage Your Account: to manage Your registration as a
                      user of the Service. The Personal Data You provide can
                      give You access to different functionalities of the
                      Service that are available to You as a registered user.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      For the performance of a contract: the development,
                      compliance and undertaking of the purchase contract for
                      the products, items or services You have purchased or of
                      any other contract with Us through the Service.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      To contact You: To contact You by email, telephone calls,
                      SMS, or other equivalent forms of electronic
                      communication, such as a mobile application&apos;s push
                      notifications regarding updates or informative
                      communications related to the functionalities, products or
                      contracted services, including the security updates, when
                      necessary or reasonable for their implementation.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      To provide You with news, special offers and general
                      information about other goods, services and events which
                      we offer that are similar to those that you have already
                      purchased or enquired about unless You have opted not to
                      receive such information.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      To manage Your requests: To attend and manage Your
                      requests to Us.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      For business transfers: We may use Your information to
                      evaluate or conduct a merger, divestiture, restructuring,
                      reorganization, dissolution, or other sale or transfer of
                      some or all of Our assets, whether as a going concern or
                      as part of bankruptcy, liquidation, or similar proceeding,
                      in which Personal Data held by Us about our Service users
                      is among the assets transferred.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      For other purposes: We may use Your information for other
                      purposes, such as data analysis, identifying usage trends,
                      determining the effectiveness of our promotional campaigns
                      and to evaluate and improve our Service, products,
                      services, marketing and your experience.
                    </span>
                  </li>
                  <p className="px-6">
                    We may share Your personal information in the following
                    situations:
                  </p>
                  <li className="px-6">
                    <span>
                      With Service Providers: We may share Your personal
                      information with Service Providers to monitor and analyse
                      the use of our Service, to contact You.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      For business transfers: We may share or transfer Your
                      personal information in connection with, or during
                      negotiations of, any merger, sale of Company assets,
                      financing, or acquisition of all or a portion of Our
                      business to another company.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      With Affiliates: We may share Your information with Our
                      affiliates, in which case we will require those affiliates
                      to honor this Privacy Policy. Affiliates include Our
                      parent company and any other subsidiaries, joint venture
                      partners or other companies that We control or that are
                      under common control with Us.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      With business partners: We may share Your information with
                      Our business partners (ex. Shiprocket for delivery) to
                      offer You certain products, services or promotions.
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      With Your consent: We may disclose Your personal
                      information for any other purpose with Your consent.
                    </span>
                  </li>
                </ul>
                <h3 className="px-6 text-md font-semibold">
                  Retention of Your Personal Data
                </h3>
                <p className="px-6">
                  The Company will retain Your Personal Data only for as long as
                  is necessary for the purposes set out in this Privacy Policy.
                  We will retain and use Your Personal Data to the extent
                  necessary to comply with our legal obligations (for example,
                  if we are required to retain your data to comply with
                  applicable laws), resolve disputes, and enforce our legal
                  agreements and policies.
                </p>
                <p className="px-6">
                  The Company will also retain Usage Data for internal analysis
                  purposes. Usage Data is generally retained for a shorter
                  period of time, except when this data is used to strengthen
                  the security or to improve the functionality of Our Service,
                  or We are legally obligated to retain this data for longer
                  time periods.
                </p>
                <h3 className="px-6 text-md font-semibold">
                  Transfer of Your Personal Data
                </h3>
                <p className="px-6">
                  Your information, including Personal Data, is processed at the
                  Company&apos;s operating offices and in any other places where
                  the parties involved in the processing are located. It means
                  that this information may be transferred to — and maintained
                  on — computers located outside of Your state, province,
                  country or other governmental jurisdiction where the data
                  protection laws may differ than those from Your jurisdiction.
                </p>
                <p className="px-6">
                  Your consent to this Privacy Policy followed by Your
                  submission of such information represents Your agreement to
                  that transfer.
                </p>
                <p className="px-6">
                  The Company will take all steps reasonably necessary to ensure
                  that Your data is treated securely and in accordance with this
                  Privacy Policy and no transfer of Your Personal Data will take
                  place to an organization or a country unless there are
                  adequate controls in place including the security of Your data
                  and other personal information.
                </p>
                <h3 className="px-6 text-md font-semibold">
                  Delete Your Personal Data
                </h3>
                <p className="px-6">
                  You have the right to delete or request that We assist in
                  deleting the Personal Data that We have collected about You.
                </p>
                <p className="px-6">
                  Our Service may give You the ability to delete certain
                  information about You from within the Service.
                </p>
                <p className="px-6">
                  You may update, amend, or delete Your information at any time
                  by signing into Your Account, if you have one, and visiting
                  the account settings section that allows you to manage Your
                  personal information. You may also contact Us to request
                  access to, correct, or delete any personal information that
                  You have provided to Us.
                </p>
                <p className="px-6">
                  Please note, however, that We may need to retain certain
                  information when we have a legal obligation or lawful basis to
                  do so.
                </p>
                <h3 className="px-6 text-md font-semibold">
                  Disclosure of Your Personal Data
                </h3>
                <h4 className="px-6 text-sm font-semibold">
                  Business Transactions
                </h4>
                <p className="px-6">
                  If the Company is involved in a merger, acquisition or asset
                  sale, Your Personal Data may be transferred. We will provide
                  notice before Your Personal Data is transferred and becomes
                  subject to a different Privacy Policy.
                </p>
                <h4 className="px-6 text-sm font-semibold">Law enforcement</h4>
                <p className="px-6">
                  Under certain circumstances, the Company may be required to
                  disclose Your Personal Data if required to do so by law or in
                  response to valid requests by public authorities (e.g. a court
                  or a government agency).
                </p>
                <h4 className="px-6 text-sm font-semibold">
                  Other legal requirements{" "}
                </h4>
                <p className="px-6">
                  The Company may disclose Your Personal Data in the good faith
                  belief that such action is necessary to:
                </p>
                <ul role="list" className="list-disc space-y-2 px-10 text-md">
                  <li className="px-6">
                    <span>Comply with a legal obligation</span>
                  </li>
                  <li className="px-6">
                    <span>
                      Protect and defend the rights or property of the Company
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Prevent or investigate possible wrongdoing in connection
                      with the Service
                    </span>
                  </li>
                  <li className="px-6">
                    <span>
                      Protect the personal safety of Users of the Service or the
                      public
                    </span>
                  </li>
                  <li className="px-6">
                    <span>Protect against legal liability</span>
                  </li>
                </ul>
                <h4 className="px-6 text-sm font-semibold">
                  Security of Your Personal Data
                </h4>
                <p className="px-6">
                  The security of Your Personal Data is important to Us but
                  remember that no method of transmission over the Internet, or
                  method of electronic storage is 100% secure. While We strive
                  to use commercially acceptable means to protect Your Personal
                  Data, we cannot guarantee its absolute security.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h1 className=" card-title px-6 py-5 text-xl font-bold">
                Children&apos;s Privacy
                </h1>
                <p className="px-6">
                  Our Service does not address anyone under the age of 13. We do
                  not knowingly collect personally identifiable information from
                  anyone under the age of 13. If You are a parent or guardian
                  and You are aware that Your child has provided Us with
                  Personal Data, please contact Us. If We become aware that We
                  have collected Personal Data from anyone under the age of 13
                  without verification of parental consent, we take steps to
                  remove that information from Our servers.
                </p>
                <p className="px-6">
                  If We need to rely on consent as a legal basis for processing
                  Your information and Your country requires consent from a
                  parent, we may require Your parent&apos;s consent before We
                  collect and use that information.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h1 className=" card-title px-6 py-5 text-xl font-bold">
                Links to Other Websites
                </h1>
                <p className="px-6">
                  Our Service may contain links to other websites that are not
                  operated by Us. If You click on a third-party link, you will
                  be directed to that third party&apos;s site. We strongly
                  advise You to review the Privacy Policy of every site You
                  visit.
                </p>
                <p className="px-6">
                  We have no control over and assume no responsibility for the
                  content, privacy policies or practices of any third-party
                  sites or services.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h1 className=" card-title px-6 py-5 text-xl font-bold">
                Changes to this Privacy Policy
                </h1>
                <p className="px-6">
                  We may update Our Privacy Policy from time to time. We will
                  notify You of any changes by posting the new Privacy Policy on
                  this page.
                </p>
                <p className="px-6">
                  We will let You know via email and/or a prominent notice on
                  Our Service, prior to the change becoming effective and update
                  the &ldquo;Last updated&ldquo; date at the top of this Privacy
                  Policy.
                </p>
                <p className="px-6">
                  You are advised to review this Privacy Policy periodically for
                  any changes. Changes to this Privacy Policy are effective when
                  they are posted on this page.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 card-bordered">
              <div className="card-body">
                <h1 className=" card-title px-6 py-5 text-xl font-bold">
                Contact Us 
                </h1>
                <p className="px-6">
                If you have any questions about this Privacy Policy, you can contact us: 
                </p>
                <p className="px-6">By email: <a href="support@dintly.in" className="link link-primary">support@dintly.in</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
