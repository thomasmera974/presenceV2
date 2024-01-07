export type DataPrototype = {

    [key : string] : string
};

export type Data = DataPrototype | null;

export type Session = {

    session : string,
    sessionId : string,
    id : string,
    sectionId : string
};

export type FichePrototype = {

    id : string,
    date : string
}

export type Fiche = Array<FichePrototype>