var sortedMaleCats = [];
var sortedFemaleCats = [];

//Asynchronous method to fetch JSON data from the API URL. The response is awaited before it is being returned.
async function getCatModal() {
    const url = 'https://agl-developer-test.azurewebsites.net/people.json';
    let response = await fetch(url);
    return await response.json();
}

// Promise method to utilize the response for further computatuon and build the list of cats under respective owners' genders
getCatModal().then(data => {   
    sortedMaleCats = populateList(data, 'Male');
    sortedFemaleCats = populateList(data, 'Female');
});

// Based on the gender being passed and the API response as parameters, a list of pet's names is generated as elements in the DOM
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

// Unit test case to check for response from the API
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

// Unit test case to check for List element generation and popu;ation of cats names under Male Owners
QUnit.test( "Male Cat Owners List Render Test",async function( assert ) {
  var foo = function(){
      let lElement = document.querySelector(`#MaleList`);
      return lElement !== undefined && sortedMaleCats.length > 0
    }
  assert.ok(await foo(), "should render the male cat owners list" );
});

// Unit test case to check for List element generation and popu;ation of cats names under female Owners
QUnit.test( "Female Cat Owners List Render Test",async function( assert ) {
  var foo = function(){
      let lElement = document.querySelector(`#FemaleList`);
      return lElement !== undefined && sortedFemaleCats.length > 0;
    }
  assert.ok(await foo(), "should render the female cat owners list" );
});
