import type { ReactNode } from 'react'
import { IMPRINT_URL } from '../data/links'
import { Code, Ext, KeyList } from '../components/PrivacyParts'
import type { Language } from '../i18n/language'

export interface PrivacySection {
  heading: string
  body: ReactNode
}

export interface PrivacyContent {
  title: string
  updated: string
  intro: string
  sections: PrivacySection[]
}

const de: PrivacyContent = {
  title: 'Datenschutzerklärung',
  updated: 'Stand: 21. Oktober 2026',
  intro:
    'Der Fractal God Rechner rechnet vollständig in deinem Browser. Es gibt kein Benutzerkonto, keine Werbung und keine Analyse- oder Tracking-Dienste. Deine Eingaben werden nicht an uns übertragen.',
  sections: [
    {
      heading: '1. Verantwortlicher',
      body: (
        <p>
          Verantwortlich für diese Website ist der Anbieter, der im{' '}
          <Ext href={IMPRINT_URL}>Impressum von breakbar.cc</Ext> genannt ist. Dort findest du auch die Kontaktdaten.
        </p>
      ),
    },
    {
      heading: '2. Hosting bei Vercel',
      body: (
        <>
          <p>
            Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA („Vercel“) gehostet.
            Beim Aufruf der Seite verarbeitet Vercel technisch notwendige Verbindungsdaten (Server-Logfiles), um die
            Seite auszuliefern und den Betrieb abzusichern. Das sind insbesondere deine IP-Adresse, Datum und Uhrzeit
            des Abrufs, die angeforderte URL, die übertragene Datenmenge, die Referrer-URL sowie Browsertyp,
            Browserversion und Betriebssystem.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO: Unser berechtigtes Interesse ist der sichere und
            zuverlässige Betrieb der Website. Da Vercel ein US-Unternehmen ist, können Daten in die USA übermittelt
            werden. Nach Angaben von Vercel stützen sich solche Übermittlungen auf das EU-U.S. Data Privacy Framework
            beziehungsweise EU-Standardvertragsklauseln. Mehr dazu steht in der{' '}
            <Ext href="https://vercel.com/legal/privacy-policy">Datenschutzerklärung von Vercel</Ext>.
          </p>
        </>
      ),
    },
    {
      heading: '3. Lokale Speicherung im Browser (localStorage)',
      body: (
        <>
          <p>
            Damit deine Einstellungen beim nächsten Besuch erhalten bleiben, speichert die Seite sie im localStorage
            deines Browsers. Folgende Einträge können angelegt werden:
          </p>
          <KeyList />
          <p>
            Der Eintrag <Code>gw2-fractal-god-api-key</Code> enthält deinen GW2-API-Schlüssel und wird nur angelegt,
            wenn du ihn selbst eingibst. Die übrigen Einträge speichern die Einstellungen deiner täglichen Routine.
            Diese Daten bleiben ausschließlich in deinem Browser. Sie werden weder an uns noch an Vercel gesendet und
            dienen nicht der Nachverfolgung. Du kannst sie jederzeit in den Einstellungen deines Browsers löschen
            („Websitedaten löschen“).
          </p>
          <p>
            Rechtsgrundlage ist § 25 Abs. 2 Nr. 2 TDDDG (die Speicherung ist für den von dir genutzten Dienst
            erforderlich) sowie Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </>
      ),
    },
    {
      heading: '4. Sprach-Cookie',
      body: (
        <>
          <p>
            Wenn du die Sprache über den Umschalter oben rechts änderst, setzt die Seite ein Cookie mit dem Namen{' '}
            <Code>breakbar-language</Code> und dem Wert <Code>de</Code> oder <Code>en</Code>. Es ist ein Jahr gültig und
            gilt für <Code>breakbar.cc</Code> und alle Subdomains, damit die Sprache auf allen breakbar-Seiten gleich
            ist. Das Cookie wird nur über HTTPS gesendet (<Code>Secure</Code>, <Code>SameSite=Lax</Code>). Es enthält
            ausschließlich deine Sprachauswahl und dient nicht dem Tracking. Ohne dein Zutun wird es nicht gesetzt.
          </p>
          <p>
            Zur Vorauswahl der Sprache liest die Seite außerdem die Spracheinstellung deines Browsers aus. Dieser Wert
            wird weder gespeichert noch übertragen. Rechtsgrundlage für das Cookie ist § 25 Abs. 2 Nr. 2 TDDDG und Art.
            6 Abs. 1 lit. f DSGVO. Du kannst es jederzeit in deinem Browser löschen.
          </p>
        </>
      ),
    },
    {
      heading: '5. Schriftarten (Google Fonts)',
      body: (
        <p>
          Zur Darstellung lädt die Seite die Schriftarten Cinzel, Inter und JetBrains Mono von Google Fonts
          (fonts.googleapis.com und fonts.gstatic.com). Dabei übermittelt dein Browser seine IP-Adresse und technische
          Verbindungsdaten an Google (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland, bzw. Google
          LLC, USA). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (einheitliche und ansprechende Darstellung). Weitere
          Informationen findest du in der{' '}
          <Ext href="https://policies.google.com/privacy">Datenschutzerklärung von Google</Ext>.
        </p>
      ),
    },
    {
      heading: '6. GW2-API (optional)',
      body: (
        <>
          <p>
            Wenn du einen API-Schlüssel einträgst und „Bestand aus GW2-API laden“ nutzt, sendet dein Browser den
            Schlüssel direkt an <Code>api.guildwars2.com</Code> (ArenaNet, LLC). Das geschieht auch automatisch beim
            Öffnen der Seite, wenn bereits ein Schlüssel gespeichert ist. ArenaNet erhält dabei technisch bedingt unter
            anderem deine IP-Adresse. Wir sehen und speichern weder den Schlüssel noch die Antworten der API.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Bereitstellung der von dir gewählten Funktion).
          </p>
          <p>
            Wir empfehlen, nur einen Schlüssel mit den Rechten <Code>account</Code>, <Code>wallet</Code>,{' '}
            <Code>inventories</Code>, <Code>progression</Code> und <Code>unlocks</Code> zu verwenden.
          </p>
        </>
      ),
    },
    {
      heading: '7. Externe Links',
      body: (
        <p>
          Die Seite verlinkt auf das <Ext href="https://wiki.guildwars2.com/">Guild Wars 2 Wiki</Ext> und auf
          breakbar.cc. Erst wenn du einen Link anklickst, werden Daten an den jeweiligen Betreiber übertragen. Für deren
          Datenverarbeitung gelten die dortigen Datenschutzerklärungen.
        </p>
      ),
    },
    {
      heading: '8. Deine Rechte',
      body: (
        <p>
          Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der
          Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Außerdem kannst du dich bei
          einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO). Wende dich dafür an die Kontaktdaten im{' '}
          <Ext href={IMPRINT_URL}>Impressum</Ext>.
        </p>
      ),
    },
    {
      heading: '9. Änderungen',
      body: <p>Wir passen diese Erklärung an, wenn sich die Website oder die Rechtslage ändert.</p>,
    },
  ],
}

const en: PrivacyContent = {
  title: 'Privacy policy',
  updated: 'Last updated: 21 October 2026',
  intro:
    'The Fractal God Calculator runs entirely in your browser. There are no user accounts, no ads and no analytics or tracking services. The data you enter is not sent to us.',
  sections: [
    {
      heading: '1. Controller',
      body: (
        <p>
          The controller of this website is the provider named in the{' '}
          <Ext href={IMPRINT_URL}>imprint of breakbar.cc</Ext>, where you will also find the contact details.
        </p>
      ),
    },
    {
      heading: '2. Hosting with Vercel',
      body: (
        <>
          <p>
            This website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA (“Vercel”). When you
            open the page, Vercel processes technically necessary connection data (server log files) to deliver the page
            and secure its operation. This includes in particular your IP address, the date and time of the request, the
            requested URL, the amount of data transferred, the referrer URL, and your browser type, browser version and
            operating system.
          </p>
          <p>
            The legal basis is Art. 6(1)(f) GDPR: our legitimate interest is the secure and reliable operation of the
            website. Because Vercel is a US company, data may be transferred to the USA. According to Vercel, such
            transfers rely on the EU-U.S. Data Privacy Framework or EU standard contractual clauses. See{' '}
            <Ext href="https://vercel.com/legal/privacy-policy">Vercel&apos;s privacy policy</Ext> for details.
          </p>
        </>
      ),
    },
    {
      heading: '3. Local storage in your browser (localStorage)',
      body: (
        <>
          <p>
            So that your settings are still there on your next visit, the page saves them in your browser&apos;s
            localStorage. The following entries can be created:
          </p>
          <KeyList />
          <p>
            The entry <Code>gw2-fractal-god-api-key</Code> contains your GW2 API key and is only created if you enter
            one yourself. The other entries store the settings of your daily routine. This data stays in your browser
            only. It is not sent to us or to Vercel and is not used for tracking. You can delete it at any time in your
            browser settings (“clear site data”).
          </p>
          <p>
            The legal basis is Section 25(2) no. 2 of the German TDDDG (storage is necessary for the service you use)
            and Art. 6(1)(f) GDPR.
          </p>
        </>
      ),
    },
    {
      heading: '4. Language cookie',
      body: (
        <>
          <p>
            When you change the language with the switcher in the top right corner, the page sets a cookie named{' '}
            <Code>breakbar-language</Code> with the value <Code>de</Code> or <Code>en</Code>. It is valid for one year
            and applies to <Code>breakbar.cc</Code> and all of its subdomains, so that the language is the same on all
            breakbar pages. The cookie is only sent over HTTPS (<Code>Secure</Code>, <Code>SameSite=Lax</Code>). It
            contains nothing but your language choice and is not used for tracking. It is not set unless you switch the
            language yourself.
          </p>
          <p>
            To preselect the language, the page also reads your browser&apos;s language setting. This value is neither
            stored nor transmitted. The legal basis for the cookie is Section 25(2) no. 2 TDDDG and Art. 6(1)(f) GDPR.
            You can delete it in your browser at any time.
          </p>
        </>
      ),
    },
    {
      heading: '5. Fonts (Google Fonts)',
      body: (
        <p>
          To display the page, it loads the fonts Cinzel, Inter and JetBrains Mono from Google Fonts
          (fonts.googleapis.com and fonts.gstatic.com). Your browser thereby transmits its IP address and technical
          connection data to Google (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland, or Google
          LLC, USA). The legal basis is Art. 6(1)(f) GDPR (a consistent and appealing presentation). More information is
          available in <Ext href="https://policies.google.com/privacy">Google&apos;s privacy policy</Ext>.
        </p>
      ),
    },
    {
      heading: '6. GW2 API (optional)',
      body: (
        <>
          <p>
            If you enter an API key and use “Load inventory from GW2 API”, your browser sends the key directly to{' '}
            <Code>api.guildwars2.com</Code> (ArenaNet, LLC). This also happens automatically when the page opens if a
            key is already stored. ArenaNet technically receives, among other things, your IP address. We neither see
            nor store the key or the API responses. The legal basis is Art. 6(1)(b) GDPR (providing the function you
            chose).
          </p>
          <p>
            We recommend using a key with only the permissions <Code>account</Code>, <Code>wallet</Code>,{' '}
            <Code>inventories</Code>, <Code>progression</Code> and <Code>unlocks</Code>.
          </p>
        </>
      ),
    },
    {
      heading: '7. External links',
      body: (
        <p>
          The page links to the <Ext href="https://wiki.guildwars2.com/">Guild Wars 2 Wiki</Ext> and to breakbar.cc.
          Data is only transmitted to the respective operator once you click a link. Their privacy policies apply to
          their processing of data.
        </p>
      ),
    },
    {
      heading: '8. Your rights',
      body: (
        <p>
          You have the right of access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of
          processing (Art. 18), data portability (Art. 20) and objection (Art. 21). You can also lodge a complaint with
          a data protection supervisory authority (Art. 77 GDPR). Please use the contact details in the{' '}
          <Ext href={IMPRINT_URL}>imprint</Ext>.
        </p>
      ),
    },
    {
      heading: '9. Changes',
      body: <p>We update this policy when the website or the legal situation changes.</p>,
    },
  ],
}

export const PRIVACY_CONTENT: Record<Language, PrivacyContent> = { en, de }
