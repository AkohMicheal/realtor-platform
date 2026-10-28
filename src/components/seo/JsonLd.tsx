import { SITE_CONFIG } from '@/lib/constants';

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['RealEstateAgent', 'LocalBusiness', 'ProfessionalService'],
        '@id': 'https://marirealty.ng/#organization',
        name: 'Mari Realty',
        alternateName: [
          'MariRealty',
          'Mari Realty Nigeria',
          'Mary Akoh Real Estate Advisory',
          'MariRealty Advisory & Investments',
        ],
        url: 'https://marirealty.ng',
        logo: 'https://marirealty.ng/icon-512.png',
        image: 'https://marirealty.ng/assets/branding/realtor-hero.webp',
        description:
          'Accredited Nigerian real estate advisory and RECB cooperative land banking platform in partnership with Zylus Group and licensed under Lagos State Cooperative Societies Law (Reg. LSCS 18176). Specializing in verified land for sale in Epe and Lekki, C of O titles, and 30%-37% fixed-dividend cashback investments.',
        telephone: '+2348027669324',
        email: 'maryakoh2017@gmail.com',
        priceRange: '₦₦₦₦',
        currenciesAccepted: 'NGN, USD, GBP, EUR',
        paymentAccepted: 'Bank Transfer, Post-Dated Cheque, Cooperative Allocation',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Lekki Phase 1 / Ikeja Corporate Axis',
          addressLocality: 'Lekki',
          addressRegion: 'Lagos State',
          postalCode: '105102',
          addressCountry: 'NG',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 6.4474,
          longitude: 3.4844,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ],
            opens: '08:00',
            closes: '18:00',
          },
        ],
        areaServed: [
          {
            '@type': 'AdministrativeArea',
            name: 'Lagos State',
          },
          {
            '@type': 'City',
            name: 'Epe',
          },
          {
            '@type': 'City',
            name: 'Lekki',
          },
          {
            '@type': 'City',
            name: 'Ibeju-Lekki',
          },
          {
            '@type': 'Country',
            name: 'Nigeria',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Diaspora Investors (UK, US, Canada, EU)',
          },
        ],
        parentOrganization: {
          '@type': 'Organization',
          name: 'Zylus Group International',
          url: 'https://zylusgroup.com',
        },
        memberOf: {
          '@type': 'Organization',
          name: 'Real Estate Cashback Cooperative (RECB)',
          identifier: 'LSCS 18176',
        },
        sameAs: [
          'https://x.com/MaryAkohRealty',
          'https://instagram.com/marirealty.ng',
        ],
        founder: {
          '@type': 'Person',
          name: 'Mary Akoh',
          jobTitle: 'Principal Real Estate Consultant & Wealth Strategist',
          award:
            'Best Behaved Female Business Associate (BA) from Active and Available Subsidiaries - Zylus Group',
          image: 'https://marirealty.ng/assets/branding/realtor-hero.webp',
          sameAs: 'https://x.com/MaryAkohRealty',
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://marirealty.ng/#website',
        url: 'https://marirealty.ng',
        name: 'MariRealty',
        description:
          'Secure Nigerian Real Estate, Verified Land in Epe and Lekki, and RECB Cooperative Cashback Investments.',
        publisher: {
          '@id': 'https://marirealty.ng/#organization',
        },
        inLanguage: 'en-NG',
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://marirealty.ng/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is Mari Realty a legal and registered real estate advisory in Nigeria?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Mari Realty (marirealty.ng) is a legitimate Nigerian real estate consultancy led by Mary Akoh, operating in accredited partnership with Zylus Group International and the Real Estate Cashback Cooperative (RECB), officially registered under the Lagos State Cooperative Societies Law (Registration No. LSCS 18176). All transactions adhere strictly to Nigerian property laws and statutory land registry frameworks.',
            },
          },
          {
            '@type': 'Question',
            name: 'Who is Mary Akoh and what are her professional credentials?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Mary Akoh is an accredited Nigerian real estate consultant, wealth strategist, and Principal Consultant at Mari Realty. She was recognized as the Best Behaved Female Business Associate (BA) from Active and Available Subsidiaries by Zylus Group International. She advises private and diaspora investors on verified land acquisition, C of O titled properties, and institutional cooperative cashback investments across Nigeria.',
            },
          },
          {
            '@type': 'Question',
            name: 'How is investor capital secured under the Real Estate Cashback (RECB) scheme?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Under the RECB scheme, member capital is secured by four institutional pillars: (1) A legally binding Deed of Agreement prepared and witnessed by accredited corporate attorneys, (2) Physical landed property collateral allocation valued at 100% of invested capital, (3) Post-dated bank cheques issued for the full maturity dividend and principal, and (4) Comprehensive insurance bond coverage through registered insurance partners.',
            },
          },
          {
            '@type': 'Question',
            name: 'What land titles are offered on properties listed by Mari Realty?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Mari Realty only lists verified Nigerian properties possessing unencumbered legal titles, including Certificate of Occupancy (C of O), Governor\'s Consent, Government Gazette, and Charted Registered Surveys with approved government allocations in prime corridors such as Epe, Ibeju-Lekki, and Lekki Phase 1.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the investment tenures and returns for Real Estate Cashback?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Real Estate Cashback scheme offers a standardized 12-month tenure delivering 30% to 37% fixed annualized returns, with an option to roll over capital for another 12 months (24 months total) upon maturity. Early exits prior to 12 months are not permitted to protect asset-backing integrity.',
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
