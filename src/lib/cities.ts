/**
 * Miasta pod dynamiczne podstrony lokalnego SEO: /najem-okazjonalny/[miasto].
 * `locative` = forma miejscownika ("w Warszawie") dla naturalnych nagłówków i treści.
 */
export interface City {
  slug: string;
  name: string; // mianownik: "Warszawa"
  locative: string; // miejscownik: "Warszawie" (po "w ...")
  region: string;
}

export const cities: City[] = [
  { slug: 'warszawa', name: 'Warszawa', locative: 'Warszawie', region: 'mazowieckie' },
  { slug: 'krakow', name: 'Kraków', locative: 'Krakowie', region: 'małopolskie' },
  { slug: 'lodz', name: 'Łódź', locative: 'Łodzi', region: 'łódzkie' },
  { slug: 'wroclaw', name: 'Wrocław', locative: 'Wrocławiu', region: 'dolnośląskie' },
  { slug: 'poznan', name: 'Poznań', locative: 'Poznaniu', region: 'wielkopolskie' },
  { slug: 'gdansk', name: 'Gdańsk', locative: 'Gdańsku', region: 'pomorskie' },
  { slug: 'szczecin', name: 'Szczecin', locative: 'Szczecinie', region: 'zachodniopomorskie' },
  { slug: 'bydgoszcz', name: 'Bydgoszcz', locative: 'Bydgoszczy', region: 'kujawsko-pomorskie' },
  { slug: 'lublin', name: 'Lublin', locative: 'Lublinie', region: 'lubelskie' },
  { slug: 'bialystok', name: 'Białystok', locative: 'Białymstoku', region: 'podlaskie' },
  { slug: 'katowice', name: 'Katowice', locative: 'Katowicach', region: 'śląskie' },
  { slug: 'gdynia', name: 'Gdynia', locative: 'Gdyni', region: 'pomorskie' },
  { slug: 'czestochowa', name: 'Częstochowa', locative: 'Częstochowie', region: 'śląskie' },
  { slug: 'radom', name: 'Radom', locative: 'Radomiu', region: 'mazowieckie' },
  { slug: 'rzeszow', name: 'Rzeszów', locative: 'Rzeszowie', region: 'podkarpackie' },
  { slug: 'torun', name: 'Toruń', locative: 'Toruniu', region: 'kujawsko-pomorskie' },
  { slug: 'olsztyn', name: 'Olsztyn', locative: 'Olsztynie', region: 'warmińsko-mazurskie' },
  { slug: 'kielce', name: 'Kielce', locative: 'Kielcach', region: 'świętokrzyskie' },
  { slug: 'gliwice', name: 'Gliwice', locative: 'Gliwicach', region: 'śląskie' },
  { slug: 'zabrze', name: 'Zabrze', locative: 'Zabrzu', region: 'śląskie' },
  { slug: 'bytom', name: 'Bytom', locative: 'Bytomiu', region: 'śląskie' },
  { slug: 'bielsko-biala', name: 'Bielsko-Biała', locative: 'Bielsku-Białej', region: 'śląskie' },
  { slug: 'opole', name: 'Opole', locative: 'Opolu', region: 'opolskie' },
  { slug: 'plock', name: 'Płock', locative: 'Płocku', region: 'mazowieckie' },
  { slug: 'elblag', name: 'Elbląg', locative: 'Elblągu', region: 'warmińsko-mazurskie' },
  { slug: 'walbrzych', name: 'Wałbrzych', locative: 'Wałbrzychu', region: 'dolnośląskie' },
  { slug: 'wloclawek', name: 'Włocławek', locative: 'Włocławku', region: 'kujawsko-pomorskie' },
  { slug: 'tarnow', name: 'Tarnów', locative: 'Tarnowie', region: 'małopolskie' },
  { slug: 'koszalin', name: 'Koszalin', locative: 'Koszalinie', region: 'zachodniopomorskie' },
  { slug: 'kalisz', name: 'Kalisz', locative: 'Kaliszu', region: 'wielkopolskie' },
  { slug: 'legnica', name: 'Legnica', locative: 'Legnicy', region: 'dolnośląskie' },
  { slug: 'gorzow-wielkopolski', name: 'Gorzów Wielkopolski', locative: 'Gorzowie Wielkopolskim', region: 'lubuskie' },
  { slug: 'zielona-gora', name: 'Zielona Góra', locative: 'Zielonej Górze', region: 'lubuskie' },
  { slug: 'rybnik', name: 'Rybnik', locative: 'Rybniku', region: 'śląskie' },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
