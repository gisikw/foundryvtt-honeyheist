import HoneyHeistActor from './actor.js';
import HoneyHeistActorSheet from './actor-sheet.js';

Hooks.once('init', async () => {
  console.log('HoneyHeist: Initializing');

  // Define custom Entity classes
  CONFIG.Actor.entityClass = HoneyHeistActor;

  // Register sheet application classes
  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('honeyheist', HoneyHeistActorSheet, {
    makeDefault: true,
  });

  Handlebars.registerHelper('removeProperty', (obj, property) => {
    const result = { ...obj };
    delete result[property];
    return result;
  });

  // CONFIG.debug.hooks = true;
});

Hooks.once('ready', async () => {
  // Make sure all roll tables are always present.
  const rollTables = {
    Organizer:
      '/systems/honey-heist/resources/roll-tables/fvtt-RollTable-Organizer.json',
    Setting:
      '/systems/honey-heist/resources/roll-tables/fvtt-RollTable-Setting.json',
    Location:
      '/systems/honey-heist/resources/roll-tables/fvtt-RollTable-Location.json',
    Prize:
      '/systems/honey-heist/resources/roll-tables/fvtt-RollTable-Prize.json',
  };

  Object.keys(rollTables).forEach((key) => {
    if (!RollTable.collection.entities.find(({ name }) => name === key)) {
      $.getJSON(rollTables[key]).then((val) => {
        RollTable.create(val);
      });
    }
  });
});

Hooks.on('renderHoneyHeistActorSheet', (ev) => {
  // Color a stat red if it's value is six.
  const bearStat = $('#stat-bear').find('.stat-value').get(0);
  const criminalStat = $('#stat-criminal').find('.stat-value').get(0);
  const bearVal = parseInt(bearStat.value, 10);
  const criminalVal = parseInt(criminalStat.value, 10);

  if (bearVal === 6) {
    $('#stat-bear').children().addClass('error-red');
  } else if (criminalVal === 6) {
    $('#stat-criminal').children().addClass('error-red');
  }

  // Show the extra hat options if the initial hat stat is 'roll-twice'.
  if ($('#hat-roll').val() === 'roll-twice') {
    $('.hat2').show();
  } else {
    $('.hat2').hide();
  }

  // Compute the HBS
  const { data } = ev.actor.data;
  const hbs = ['A', 'B', 'C', 'D', 'E']
    .map((x) => parseInt(data[`disguise${x}`], 10) || 0)
    .reduce((x, y) => x + y);
  $('#hbs-value').text(hbs);
});
