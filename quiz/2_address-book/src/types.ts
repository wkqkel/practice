interface PhoneNumberDictionary {
  [phone: string]: {
    num: number;
  };
}

// 전화번호부라는 객체의 규격을 정의
interface Contact {
  name: string;
  address: string;
  phones: PhoneNumberDictionary;
}

// 왼쪽에 이넘의 속성을 정의하고, 오른쪽에 할당될 문자의 값을 정의
enum PhoneType {
  Home = "home",
  Office = "office",
  Studio = "studio",
}

export { Contact, PhoneType };
