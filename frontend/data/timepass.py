from transformers import pipeline

# Initialize a text generation pipeline using GPT-2 model
generator = pipeline('text-generation', model='gpt2')

def generate_samosa_description():
    prompt = "Describe a samosa in 30 words."
    description = generator(prompt, max_length=50, num_return_sequences=1)[0]['generated_text']
    
    # Clean up the description to ensure it's around 30 words
    words = description.split()
    if len(words) > 30:
        description = ' '.join(words[:30]) + '.'
    
    return description

print(generate_samosa_description())
