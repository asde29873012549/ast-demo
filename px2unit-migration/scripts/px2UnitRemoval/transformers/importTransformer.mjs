export class ImportCollector {
  constructor() {
    this.imports = [];
  }

  collectImport(specifierPath, importPath) {
    if (specifierPath.node.local.name !== "px2Unit") return;

    this.imports.push({
      importPath,
      identifierPath: specifierPath.get("local"),
    });
  }

  removeUnusedImports() {
    this.imports.forEach(({ importPath, identifierPath }) => {
      const isReferenced = identifierPath.isReferencedIdentifier();
      !isReferenced && importPath.remove();
    });
  }
}
