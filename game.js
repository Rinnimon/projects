
/* The main text */
const textElement = document.getElementById('text')
/* the option buttons elements*/
const optionButtonsElement = document.getElementById('option-buttons')

/* what the character has on them  */
let state = {}

/* starts the game*/
function startGame() {
  state = {}
  showTextNode(1)
}


function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)

  /* changes Text to what id you have it as */
  textElement.innerText = textNode.text

  /* removes options so you can add what you want */
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  // creates options 
  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')

      /*on click event */
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

// if no required state shows option if it does it doesnt show it until state is true
function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText

  // if textnode less than 0 it restarts game
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  // overides state with everyything from setState 
  state = Object.assign(state, option.setState)
  //Shows option if state is true
  showTextNode(nextTextNodeId)
}
// All the textNodes for the game 
const textNodes = [
  {
    id: 1,
    text: 'You wake in a room that is not yours. The room is completely barren besides one window',
    options: [
      {
        text: 'Go back to sleep',
        nextText: 12
      },
      {
        text: 'look out the window',        
        nextText: 2 
      }
    ]
  },

  {
    id:12,
    text: 'Congratulations you finally realized the only way to win is not play',
    options:
    [
      {
      text: 'Restart',
      nextText: -1
      }
    ]
   

  },

  {
    id: 2,
    text: 'You look outside the window, but there is nothing but a brick wall with a poster of a cute cat hanging from a branch saying hang in there',
    options: [
      {
        text: 'Stare at poster intently',
       
        
        nextText: 13
      },
      {
        text: 'Leave',
        nextText: 3
      },
      {
        text: 'Stick head out window ',
        nextText: 15
      },
    ]
  },


    {
      id:13,
      text: 'Staring at the poster to long gives you a crippling feeling of sadness.  CONGRATS YOU EARNED +1 SADNESS',
      options:
      [

        {
            text: 'leave',
            nextText: 3
        },

        {
          text: 'Keep staring',
         setState: { depression: true},
          nextText: 14
        },
      ]

    },

  {
    id: 14,
    text:'For some reason you think it wise to stare at the poster longer you have earned full blown DEPRESSION...CONGRATS',
    options:

    [
      {
        text: 'leave',
        nextText: 3
      } ,

      {
        text:'leave again',
        nextText:3
      },

    ]
        
  },

  {
    id:15,
    text:'You stick your head out the window to a crow trying to peck your eyes out',
    options:
    [
      {
        text:'Pocket the crow',
        setState: {crow:true},
        nextText: 3

      },

      {
        text:'accept fate and get eaten by CROW UWU',
        nextText:10  
      },
    ]

  },

   


  {
    id: 3,
    text: 'With nothing to do you sit down and try to think of what to do next',
    options: [
      {
        text: 'Meditate',
        nextText: 16
      },
      {
        text: 'tap feet impatiently',
        nextText: 19
      },

      {
        text: 'Summon a demon',
        requiredState: (currentState) => currentState.crow,
        nextText: 6
      },

      {
      text:'Use black magic',
      requiredState: (currentState) => currentState.crow,
      nextText: 6 
      },
    ]
  },

  {
    id:16,
    text:'Sitting there taking in your surroundings you slowly begin to hear voices whispering in your ear',
    options: 
    [
        {
          text:'Listen to the voices',
          nextText: 17,
        },

        {
          text: 'DOO DOO ',
          nextText: 18,
        },

    ]
  },

  {
    id:17,
    text: 'You focus your hearing on the voices and make out them telling you to jump full force at the window. You shoot up from the floor and sprint at the window and just at the point of impact there is a flash of light. When then lights leaves your vision all you feel is pain seeing that you landed in a pile of cacti. You pick yourself up from the cacti wincing in pain now and then, what do you do now?',
    options: 
    [
      {
        text: 'Check your surroundings',
        nextText: 4,

      },

      {
        text:'Scream in pain',
        nextText: 4,
      },


    ]
  },

  {
    id:18,
    text: 'You get so scared that you poop your pants till you die of dehydration',
    options: 
    [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },

  {
    id:19,
    text:'Being the man child you are you tap your feet impatiently... didnt accomplish much but you burnt off some steam ',
    options:   
    [
      {
        text: 'back',
        nextText: 3
      }
    ]

  },


  
  {
    id: 10,
    text: 'CONGRATS YOU DIED ',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
 
]

/* starts the game when it loads*/
startGame()