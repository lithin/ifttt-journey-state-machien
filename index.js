const { createMachine } = require('xstate');

// import { createMachine } from "xstate";



const machine = createMachine({
  id: "vaccineDeclarationJourney",
  initial: "completeProfile",
  states: {
    completeProfile: {
      on: {
        COMPLETE_PROFILE: { target: "covidStuff" },
      },
    },
    covidStuff: {
      type: 'parallel',
      id: 'covidStuff',
      states: {
        assessments: {
          initial: 'vaccine',
          states: {
            vaccine: {
              on: {
                COMPLETE_VACCINE: { target: 'vaccineAndSAT' }
              },
              meta: {
                type: 'assessment'
              }
            },
            vaccineAndSAT: {
              type: 'parallel',
              id: 'vaccineAndSAT',
              states: {
                vaccine: {
                  meta: {
                    type: 'assessment'
                  }
                },
                sat: {
                  meta: {
                    type: 'assessment'
                  }
                }
              }
            }
          }
        },
        appointment: {
          meta: {
            type: 'appointment'
          }
        }
      }
    },
  },
});



const fs = require('fs');

console.time();
const stringified = JSON.stringify(machine)
console.timeEnd()

fs.writeFileSync('./file.json', stringified, {encoding: 'utf8'});

const file = fs.readFileSync('./fhir.schema.json', {encoding:'utf8'});

console.time();
const parsed = JSON.parse(file);

console.timeEnd()