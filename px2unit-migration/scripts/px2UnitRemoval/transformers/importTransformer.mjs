export class ImportCollector {
  constructor() {
    this.imports = new Map();
  }

  collectImport(specifierPath, importPath) {
    if (specifierPath.node.local.name !== "px2Unit") return;

    if (!this.imports.has(importPath)) {
      this.imports.set(importPath, [specifierPath]);
    } else {
      this.imports.get(importPath).push(specifierPath);
    }
  }

  removeUnusedImports() {
    this.imports.forEach((specifierPaths, importPath) => {
      specifierPaths.forEach(specifierPath => {
        // refresh scope binding info
        specifierPath.scope.crawl();

        const identifierName = specifierPath.get("local")?.node.name;
        const binding = specifierPath.scope.getBinding(identifierName);
        if (binding && binding.referenced) return;

        specifierPath.remove();

        const remainingSpecifiers = importPath.get("specifiers");
        if (remainingSpecifiers.length === 0) {
          importPath.remove();
        }
      });
    });
  }
}
