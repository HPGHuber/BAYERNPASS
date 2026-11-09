# BAYERNPASS — Das offene Betriebssystem für Bayern

**#UNSERBAYERN · #BAYERNDERZUKUNFT**

BAYERNPASS ist eine offene, modulare und föderierte digitale Infrastruktur für Bürgerinnen und Bürger, Kommunen, Vereine, öffentliche Einrichtungen und Unternehmen in Bayern.

> **Ein Zugang. Viele Dienste. Selbstbestimmte Daten. Echte Mitbestimmung.**

BAYERNPASS soll den Zugang zu digitalen Angeboten vereinfachen, demokratische Beteiligung stärken und gemeinsame Standards schaffen – ohne ein zentrales Datensilo und ohne Menschen von einer einzelnen Identitätsanbieterin abhängig zu machen.

## Was wir bauen

- **Bürgerportal:** ein verständlicher Einstieg zu kommunalen und landesweiten Diensten.
- **Demokratie:** Vorschläge, Dialoge, Konsultationen und Bürgerbudgets auf Basis von CONSUL Democracy.
- **Identität & Zugang:** passwortarme Anmeldung über HEAVENKEY / WebAuthn sowie anschlussfähige Identitätsnachweise.
- **Wallet-Integration:** vorbereitete Schnittstellen für BayernID und die European Digital Identity Wallet (EUDI Wallet), vorbehaltlich offizieller Integrationsmöglichkeiten.
- **Föderation:** getrennte Datenräume und Zuständigkeiten für Kommunen, Freistaat, Vereine und Partner.
- **Open Source:** nachvollziehbare Architektur, offene Schnittstellen und gemeinschaftliche Entwicklung.

## Architekturprinzipien

1. **Föderiert statt zentralisiert:** Jede Organisation bleibt für ihre Daten und Verfahren verantwortlich.
2. **Datenschutz durch Gestaltung:** Datensparsamkeit, Zweckbindung und kurze Aufbewahrung.
3. **Freiwillige Identitätsoptionen:** World ID kann – falls rechtlich und technisch geeignet – optional als zusätzlicher Menschlichkeitsnachweis geprüft werden. Sie ersetzt weder Wohnsitznachweis noch amtliche Identität.
4. **Barrierearm und inklusiv:** Digitale und nicht-digitale Zugangswege; keine Benachteiligung ohne Smartphone oder biometrischen Nachweis.
5. **Offene Standards:** OIDC, OAuth 2.1, WebAuthn/FIDO2, dokumentierte APIs und interoperable Nachweise.
6. **Demokratisch legitimiert:** Digitale Beteiligung ist nicht automatisch eine rechtsverbindliche Wahl oder Abstimmung.

## Projektstatus

**Phase 0 – Architektur- und Prototyp-Grundlage.** Dieses Repository enthält die Vision, Architekturleitlinien, Sicherheitsgrundsätze, Roadmap und einen ersten statischen Portal-Prototyp. Es ist noch kein produktives Verwaltungs- oder Identitätssystem.

## Schnellstart

Der erste Prototyp benötigt keine Installation:

1. Repository klonen.
2. `apps/bayernpass-web/index.html` im Browser öffnen.

Für die spätere Web-App werden Framework, Build-System, Tests und Deployment gemeinsam festgelegt.

## Projektstruktur

```
apps/
  bayernpass-web/       Portal-Prototyp
docs/
  architecture.md       Systemarchitektur
  vision.md             Auftrag und Leitbild
  roadmap.md            Entwicklungsphasen
  security-privacy.md   Sicherheits- und Datenschutzgrundsätze
CONTRIBUTING.md         Mitarbeit
```

## Geplante Pilotfelder

- **München:** lokale Beteiligung, Quartiersprojekte und Bürgerdialog.
- **Kommunen in Bayern:** übertragbare Beteiligungs- und Servicebausteine.
- **FC Bayern / Fan-Community:** Fan-Dialog und Beteiligungsformate – getrennt von vereinsrechtlich verbindlichen Mitgliederentscheidungen.
- **Freistaat Bayern:** perspektivisch ressortübergreifende Informations- und Beteiligungsangebote.

Pilotpartner sind nicht automatisch Projektpartner oder Unterstützer. Kooperationen werden erst nach ausdrücklicher Vereinbarung ausgewiesen.

## Mitmachen

Ideen, technische Beiträge, Übersetzungen, Barrierefreiheitstests und konstruktive Kritik sind willkommen. Bitte zuerst [CONTRIBUTING.md](CONTRIBUTING.md) lesen.

## Hinweis

BAYERNPASS ist ein unabhängiges Open-Source-Konzept und derzeit kein offizielles Angebot des Freistaats Bayern, der Landeshauptstadt München, des FC Bayern München oder von World. Namen und Marken Dritter werden ausschließlich zur Beschreibung möglicher Integrationen genannt.

**Gemeinsam gestalten wir die digitale Zukunft Bayerns.**
