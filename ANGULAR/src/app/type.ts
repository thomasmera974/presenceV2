export type DataPrototype = {

    [key : string] : string | string[]
};

export type Data = DataPrototype | null;

export function getData(list : any) : DataPrototype {

    let data! : DataPrototype;

    let input = null;

    for (let index = 0; index < list.length; index++) {

        input = list[index].nativeElement;

        if( !data  ) data = { [input.name] : input.value };
        else data[input.name] = input.value;
      
    }

    return data;
}

export type Session = {

    session : string,
    sessionId : string,
    id : string,
    sectionId : string
};

export type FichePrototype = {

    id : string,
    date : string,

    hour : DataPrototype,
    abs : Array<string>
}

export type Fiche = Array<FichePrototype>