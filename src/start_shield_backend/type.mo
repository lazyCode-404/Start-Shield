module {
  public type UserDetails = {
    prenume: Text;
    numeDeFamilie: Text;
    emailPrincipal: Text;
    emailAlternativ: Text;
    telefonMobil: Text;
    telefonFix: ?Text;
    adresaCompleta: Text;
    adresaCorespondenta: ?Text;
    ziuaNasterii: Int;
    lunaNasterii: Int;
    anulNasterii: Int;
    gen: Text;
    numarIdentificare: Text;
    documenteIdentitate: Text;
    numeUrgenta: Text;
    relatieUrgenta: Text;
    telefonUrgenta: Text;
    conturiBancare: Text;
    carduriCredit: Text;
    canalePreferate: [Text];
  };
};
