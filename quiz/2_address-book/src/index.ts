// 11-1 프로젝트소개
// 해당폴더 마우스 오른쪽 누르고 open in Intergrated terminal 들어와서 yarn install
// 11-2 프로젝트 실습 방법안내
// tsConfigJson에 noImplicitAny,strict, strictFunctionTypes을 true로 바꿔주면 로직파일에 에러가 남
// .eslintc.js가서 또 typescript off돼있는걸 주석처리하면 api쪽 펑션보면 에러 남.

// phones안의 phone은 그냥 변수로 아래보면 키값인 phone은 home이될수도 office가 될수도 있음
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
// TODO: 아래 함수의 반환 타입을 지정해보세요.
// fetchContacts는 api묘사함수로 리턴값이 프로미스
// api호출해와서 응답의 규격을 정의할 때 제네릭을 가장 많이 사용

// Contact라는 인터페이스의 배열을 Promise의 반환값으로 받겠다
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
    {
      name: "Banner",
      address: "New York",
      phones: {
        home: {
          num: 77788889999,
        },
      },
    },
    {
      name: "마동석",
      address: "서울시 강남구",
      phones: {
        home: {
          num: 213423452,
        },
        studio: {
          num: 314882045,
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
