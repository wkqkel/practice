
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

// api
function fetchContacts(): Promise<Contact[]> {
  // TODO: 아래 변수의 타입을 지정해보세요.

  const contacts: Contact[] = [
    {
      name: "Tony",
      address: "Malibu",
      phones: {
        home: {
          num: 11122223333,
        },
        office: {
          num: 44455556666,
        },
      },
    },
  ];
  return new Promise((resolve) => {
    setTimeout(() => resolve(contacts), 2000);
  });
}
//클래스에 메써드를 정의해놈 이 메써드의 타입을 정리해볼거
// main
class AddressBook {
  // TODO: 아래 변수의 타입을 지정해보세요.
  contacts: Contact[] = [];

  constructor() {
    this.fetchData();
  }

  fetchData(): void {
    fetchContacts().then((response) => {
      this.contacts = response;
    });
  }

  /* TODO: 아래 함수들의 파라미터 타입과 반환 타입을 지정해보세요 */
  findContactByName(name: string): Contact[] {
    return this.contacts.filter((contact) => contact.name === name);
  }

  findContactByAddress(address: string): Contact[] {
    return this.contacts.filter((contact) => contact.address === address);
  }

  findContactByPhone(phoneNumber: number, phoneType: PhoneType): Contact[] {
    return this.contacts.filter(
      (contact) => contact.phones[phoneType].num === phoneNumber
    );
  }
  // findContactByPhone('homea') // 이런식으로 문자를 그냥 치면 오타도 날수있고 이것 보다 변수를 쓰는게 안전 => 이넘을 활용
  // 웨어서 이넘을 정의하고 string이 아니라 제한된 문자열의 집합인 이넘을 넣어주면
  // findContactByPhone(PhoneType.Home) // 이런식으로 사용가능

  addContact(contact: Contact): void {
    this.contacts.push(contact);
  }
  // contacts에서 name만 뽑아서 새로운 배열을 만듬
  displayListByName(): string[] {
    return this.contacts.map((contact) => contact.name);
  }

  displayListByAddress(): string[] {
    return this.contacts.map((contact) => contact.address);
  }
  /* ------------------------------------------------ */
}

new AddressBook();
