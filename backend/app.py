from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)


@app.route('/generate', methods=['POST'])
def generate_music():
    data = request.json
    chords = data.get('chords')
    key = data.get('key')
    bpm = data.get('bpm')
    
    generated_music = create_music(chords, key, bpm)
    
    response = make_response(jsonify({'music': generated_music}))
    return response

def create_music(chords, key, bpm):
    # Replace with actual logic to preprocess input and set up Jukebox parameters
    model = "5b_lyrics"  # Example model
    name = "sample_output"
    levels = 3
    sample_length_in_seconds = 20
    total_sample_length_in_seconds = 180
    sr = 44100
    n_samples = 1
    hop_fraction = "0.5,0.5,0.125"
    
    # Construct command to run Jukebox sampling script
    cmd = (
        f"python jukebox/sample.py --model={model} --name={name} --levels={levels} "
        f"--sample_length_in_seconds={sample_length_in_seconds} "
        f"--total_sample_length_in_seconds={total_sample_length_in_seconds} --sr={sr} "
        f"--n_samples={n_samples} --hop_fraction={hop_fraction}"
    )
    
    # Run Jukebox sampling script and wait for it to complete
    process = subprocess.run(cmd, shell=True, check=True)
    
    # Assume the generated music is saved to a file named 'output.wav' in the directory '{name}/level_0'
    generated_music_file = os.path.join(name, "level_0", "output.wav")
    
    return generated_music_file  # Return the path to the generated music file

if __name__ == '__main__':
    app.run()
