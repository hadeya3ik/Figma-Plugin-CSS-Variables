figma.showUI(__html__);

figma.ui.resize(700, 900)

figma.ui.onmessage =  async () => {
  let localVariables = await figma.variables.getLocalVariablesAsync();
  const collections = await figma.variables.getLocalVariableCollectionsAsync();

  localVariables = localVariables.filter(variable => variable.resolvedType==="COLOR").sort((a, b) => a.name.localeCompare(b.name));
  console.log( "var : ", localVariables)
  console.log( "sorted : ", localVariables.sort((a,b) => a.name.localeCompare(b.name)))

  const mappedCollection = localVariables.map((element) => ({
    id : element.id,
    name : element.name,
    valuesByMode : element.valuesByMode
  }))

  figma.ui.postMessage({
    type: "Variable to CSS converter",
    modes : collections[0].modes,
    variablesList: mappedCollection
  });
}
