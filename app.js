var sortedMaleCats = [];
var sortedFemaleCats = [];

async function getCatModal() {
    const url = 'https://agl-developer-test.azurewebsites.net/people.json';
    let response = await fetch(url);
    return await response.json();
}
getCatModal().then(data => {   
    sortedMaleCats = populateList(data, 'Male');
    sortedFemaleCats = populateList(data, 'Female');
});

function populateList(model, type) {
    let cats = [];
    let lElement = document.querySelector(`#${type}List`);
    let filteredItems = model.filter(person => person.gender == type);
    filteredItems.forEach(person => {
        if (person.pets) {
            for (let pet in person.pets) {
                let petInstance = person.pets[pet];
                if (petInstance.type === 'Cat') cats.push(petInstance.name)
            }
        }
    });
    cats.sort();
    cats.forEach(cat => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(cat));
        lElement.appendChild(li);
    })
  
  return cats;
}

QUnit.test( "API Response Test",async function( assert ) {
  var foo = function(){
      let res = getCatModal().then(data => { 
        res = data;
        return res.length > 0;
      }); 
    return res;
    };
  assert.ok(await foo(), `should obtain response from the server` );
});

QUnit.test( "Male Cat Owners List Render Test",async function( assert ) {
  var foo = function(){
      let lElement = document.querySelector(`#MaleList`);
      return lElement !== undefined && sortedMaleCats.length > 0
    }
  assert.ok(await foo(), "should render the male cat owners list" );
});

QUnit.test( "Female Cat Owners List Render Test",async function( assert ) {
  var foo = function(){
      let lElement = document.querySelector(`#FemaleList`);
      return lElement !== undefined && sortedFemaleCats.length > 0;
    }
  assert.ok(await foo(), "should render the female cat owners list" );
});
