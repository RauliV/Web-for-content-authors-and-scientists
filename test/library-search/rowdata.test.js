describe('constructPublicationRowData(publications, years)', function () {
  let publications;
  let years;

  before(async function () {
    publications = getPublications(publicationsData);
    years = getYears(publications);
  });

  it('should return an empty array when years is empty', function () {
    const rowData = constructPublicationRowData(publications, []);
    chai
      .expect(rowData)
      .to.be.an(
        'array',
        `Expected constructPublicationRowData() to return an array but received ${typeof rowData}`
      );
    chai.expect(rowData).to.be.empty;
  });

  it('should return an empty array when publications is empty', function () {
    const rowData = constructPublicationRowData({}, years);
    chai
      .expect(rowData)
      .to.be.an(
        'array',
        `Expected constructPublicationRowData() to return an array but received ${typeof rowData}`
      );
    chai.expect(rowData).to.be.empty;
  });

  it("should return an empty array when publications don't exist on the selected years", function () {
    const rowData = constructPublicationRowData(publications, [years[0] - 10]);
    chai
      .expect(rowData)
      .to.be.an(
        'array',
        `Expected constructPublicationRowData() to return an array but received ${typeof rowData}`
      );
    chai.expect(rowData).to.be.empty;
  });

  it('should return only publications from the selected years', function () {
    const selectedYears = [years[0]];
    const selectedPublications = publications[years[0]];
    const rowData = constructPublicationRowData(publications, selectedYears);

    chai
      .expect(rowData)
      .to.be.an(
        'array',
        `Expected constructPublicationRowData() to return an array but received ${typeof rowData}`
      );
    chai.expect(rowData).to.not.be.empty;
    chai
      .expect(rowData.length)
      .to.equal(
        selectedPublications.length,
        `Expected to find ${selectedPublications.length} publications but found ${rowData.length} instead.`
      );

    selectedPublications.forEach((publication, i) => {
      const { title, authors, year } = publication;
      const [firstAuthor, ...coAuthors] = authors.map(author => author.text);
      const expectedRow = [year, title, firstAuthor, coAuthors.join(', ')];
      chai
        .expect(rowData[i])
        .to.deep.equal(
          expectedRow,
          `Expected row ${i + 1} to be ${JSON.stringify(expectedRow)} but found ${JSON.stringify(
            rowData[i]
          )} instead.`
        );
    });
  });

  it('should return all publication when selecting all years', function () {
    const selectedYears = [...years];
    const selectedPublications = selectedYears.flatMap(year => publications[year]);
    const rowData = constructPublicationRowData(publications, selectedYears);

    chai
      .expect(rowData)
      .to.be.an(
        'array',
        `Expected constructPublicationRowData() to return an array but received ${typeof rowData}`
      );
    chai.expect(rowData).to.not.be.empty;
    chai
      .expect(rowData.length)
      .to.equal(
        selectedPublications.length,
        `Expected to find ${selectedPublications.length} publications but found ${rowData.length} instead.`
      );

    selectedPublications.forEach((publication, i) => {
      const { title, authors, year } = publication;
      const [firstAuthor, ...coAuthors] = authors.map(author => author.text);
      const expectedRow = [year, title, firstAuthor, coAuthors.join(', ')];
      chai
        .expect(rowData[i])
        .to.deep.equal(
          expectedRow,
          `Expected row ${i + 1} to be ${JSON.stringify(expectedRow)} but found ${JSON.stringify(
            rowData[i]
          )} instead.`
        );
    });
  });
});
