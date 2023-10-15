import React from 'react';
import Audiocraft from '@audiocraft/react';

const MusicGenerator = () => {
  // Create a new Audiocraft project
  const project = new Audiocraft.Project();

  // Set the BPM and key
  project.tempo = 105;
  project.key = 'C';
  project.mode = 'major';

  // Generate the music
  const music = project.generate();

  // Return the music
  return (
    <Audiocraft.Player music={music} />
  );
};

export default MusicGenerator;
