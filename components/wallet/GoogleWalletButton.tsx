import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import * as jose from "jose";
import { useEffect, useState } from "react";

export const GoogleWalletButton = () => {
  const [saveUrl, setSaveUrl] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Setting up Google Wallet API variables that are relevant to Sigmoji I.
     *
     * It's okay to expose our Google Wallet API private key here because the
     * "useful" information in the passes are the signatures from the cards,
     * which cannot be forged. Without those signatures, no valid ZKPs can be made.
     * This is a necessary hack to avoid sending the user's private signatures
     * to the server to get signed, which is usually how passes are handled.
     *
     * Another way of thinking about this is that the cards in some sense are the
     * server for this application.
     */
    const issuerId = "3388000000022248072";
    const classId = `${issuerId}.sigmoji_sbc_final_1`;
    const objectSuffix = uuidv4();
    const objectId = `${issuerId}.${objectSuffix}`;
    const private_key_str =
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCiaTp66TwI472V\nhZpX+RQFw+OmzuqU3t/Vt5Gk9FQ/3tpwFr1HKB6iCYAxCv/CyGRueuEYiGF/6cPY\ndgVE4OrdRgG8A8kaL2SOSGqmDL2WkKZoVpxxNomutWFwGNkCFys6ZFAac01znSKC\nj0qq7rReyHKva9EGXK9Zmx0vNDytpnVVjNZgUHbEHyD9noQM+OuZW6SoLxb2Rii/\nHczjsud8q9524OGC0eKipaHis9temZdcQEY+15d4h8Ct6S/tEwdUipNPBIobNX00\nLXAoLGabg5k5hShs2bXA1taPYQR5Wxc6vmn/W+KjzHpJhAmfk0il186ZCpg1//YP\n4CyHendVAgMBAAECggEADaDt7t1+k7JkuNTeyE4W/4raIifP6JExUFJYrvJv1XJC\ne1B1LrDvrSJF9xeYscQ2JU07cV8Ua3L248W3mHmVS98xixD4QbHDauspw+hiym02\nAaBu/VMZx6bh19HF+BZworRDQoz1bWO8vx7+IYzpZuDEOvM9tZ52enr5PnpQMzQY\nAKLygZFbLFYPS9+pU7sEPpy8+QMT+Djwsf46Ufd4mQket+wqMS2jN+zTA8pCOm3Y\nY0e7oRJZeR7XSV4NLNGAaoADUPxafuDpD9wAHs/+SMEsrBPX2OzA7a6gpm2R1qVC\n769h5UDfeXZ4Ox4eAmSybRX0bQJP75e3K9QRBjFJ8QKBgQDNF8FOGJ6qaHZpGVR4\nWLFwa9cEgfbQusau82s23Fb/GQ+IQFroh5hFTyNz6qLX7n1UN4z89aBI8HupPsW5\nITNrc9dVcc+DvO5nabExCTg/119EVmb65GAnXC8Abwx0BMpVUyIsp2h/62Lgz1xX\nt3iJXHM0hW98Be8vuWrrcEZe/QKBgQDKuVca3UPcJxf3RbJIzkLfuBjn2PHqVFAp\nbkalYY8KIycLAo5Yn/7fqBZZmqDlzOFooh9y3SzasaXlYi6WYutCORP6/trKB3GQ\ngbO2IkbXqq5gysuCVYt2HtoMTrrqJYT5/+T4QeuT9E0gGESkl8vybn+ljYIpe2wj\ntt/oDWPlOQKBgCezJ3oEjgISgolJm+5HzOEkHtUCi1JQNVF8UQ6njDeJFFadjntg\nc/tGnGg9zRPbWGtK7YGx0jsMQgO64O87HAb6v34Mr8yib8uYy/HgBQFmoUxLJVf/\niRVVZMvCszhqDPiDRSQ7q6DHYbZ+rTNVkoGUYcCS68eoJmqoi6fTbevJAoGACL9u\nrs4Ve46ETjtHsjSUVisPiBGofsAcpW0Ix2IqVfmmWadGlTRyPxx1unAduUzZ/TXh\nvYclxFoeGoPeFsc196mW3yHYNxeTIvU12AoqnGvVEoAtv/YJCpPSPO24yxnLXy5X\npw7RJ5VHLrddXuzd9BwojfBJSZj11aSyjMTnJqECgYB06E9uHgvFefq4P50E5xxl\nMQELrsfDGP4L4UkUQvQ8UAsBXNnEFaiuFarQR+wbYv/JoU3/6S/n/C5RtFdZb6b/\nGmwUtIa/vZ5ojrdRsup2enF8Z91Q0b8d9PobeIRYn9pbBOC7NJ5JNlQRVBtEWQwR\nOGUNQQVf5JXVDQuti4DAuA==\n-----END PRIVATE KEY-----\n";

    let genericObject = {
      id: `${objectId}`,
      classId: classId,
      genericType: "GENERIC_TYPE_UNSPECIFIED",
      hexBackgroundColor: "#1A1A1A",
      logo: {
        sourceUri: {
          uri: "https://i.ibb.co/bbvN62L/logo.png",
        },
      },
      barcode: {
        type: "QR_CODE",
        value: "http://nfctap.xyz",
        alternateText: "nfctap.xyz",
      },
      cardTitle: {
        defaultValue: {
          language: "en",
          value: "nfctap.xyz",
        },
      },
      heroImage: {
        sourceUri: {
          uri: "https://raw.githubusercontent.com/project-vinyl/nfctap.xyz/579e0cdbda8fab976230deb0594b810f3db747ff/models/sigmoji.pass/strip%403x.png",
        },
      },
      subheader: {
        defaultValue: {
          language: "en",
          value: "Collection",
        },
      },
      header: {
        defaultValue: {
          language: "en",
          value: "Sigmojis I",
        },
      },
      textModulesData: [
        {
          id: "score",
          header: "SCORE",
          body: "?",
        },
        {
          id: "collected",
          header: "COLLECTED",
          body: "1/20",
        },
        {
          id: "location",
          header: "LOCATION",
          body: "Stanford",
        },
        {
          id: "event",
          header: "EVENT",
          body: "SBC",
        },
        {
          id: "year",
          header: "YEAR",
          body: "2023",
        },
      ],
      linksModuleData: {
        uris: [
          {
            uri: "http://nfctap.xyz",
            description: "Retrieve your collection",
            id: "official_site",
          },
        ],
      },
    };

    const claims = {
      iss: "project-vinyl@self-1590553424634.iam.gserviceaccount.com",
      aud: "google",
      origins: [],
      typ: "savetowallet",
      payload: {
        genericObjects: [genericObject],
      },
    };

    const generateSaveUrl = async () => {
      const private_key = await jose.importPKCS8(private_key_str, "RS256");

      console.log("sk", private_key);
      console.log("claims", claims);

      const token = await new jose.SignJWT(claims)
        .setProtectedHeader({ alg: "RS256", typ: "JWT" })
        .setIssuedAt() // Add issued at time (iat)
        .sign(private_key);

      console.log("token", token);

      setSaveUrl(`https://pay.google.com/gp/v/save/${token}`);
    };

    generateSaveUrl();
  }, []);

  return (
    <div className="flex justify-center">
      <a href={saveUrl ? saveUrl : "#"}>
        <Image
          src="/buttons/AddToGoogleWallet.svg"
          alt="Add To Google Wallet"
          width={0}
          height={0}
          sizes="100vw"
          style={
            saveUrl
              ? { width: "auto", height: "42px" }
              : { width: "auto", height: "42px", filter: "grayscale(100%)" }
          } // optional
        />
      </a>
    </div>
  );
};
