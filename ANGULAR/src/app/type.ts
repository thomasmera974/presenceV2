export type DataPrototype = {

    [key : string] : string
};

export type Data = DataPrototype | null;

export type Session = {

    name : string,
    id : string,
    sectionId : string
};

export type FichePrototype = {

    id : string,
    date : Date
}

export type Fiche = Array<FichePrototype>