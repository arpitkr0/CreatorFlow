from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import json

# Load model and tokenizer
repo_name = "arpitkr0/mistral_yt"
tokenizer = AutoTokenizer.from_pretrained(repo_name)
model = AutoModelForCausalLM.from_pretrained(
    repo_name,
    device_map="auto",
    torch_dtype=torch.float16
)

def generate_complete_metadata(prompt, max_length=600, temperature=0.7):  # Increased max_length
    # More explicit instruction to include all sections
    formatted_prompt = f"""Below is an instruction that describes a task. Write a response that completes the request.

### Instruction:
Generate complete YouTube video metadata including Title, Niche, Description, Tags, and Script based on the main idea. 
Include all sections exactly as specified.

### Input:
{prompt}

### Response:
Title:"""
    
    inputs = tokenizer(formatted_prompt, return_tensors="pt").to(model.device)
    
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_length=max_length,
            temperature=temperature,
            top_p=0.9,
            do_sample=True,
            pad_token_id=tokenizer.eos_token_id,
            eos_token_id=tokenizer.eos_token_id,
            no_repeat_ngram_size=3  # Helps avoid repetition
        )
    
    full_response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    response = full_response.split("### Response:")[1].strip()
    
    # Verify all sections exist
    required_sections = ["Title:", "Niche:", "Description:", "Tags:", "Script:"]
    for section in required_sections:
        if section not in response:
            response += f"\n\n{section} "  # Add missing section header
    
    return response

# Test with sample prompt
test_prompt = "How to train your dog to sit"
print("Generated Metadata:")
metadata = generate_complete_metadata(test_prompt)
print(metadata)

# Optional: Convert to JSON format
def metadata_to_json(metadata_text, prompt):
    sections = {
        "title": "Title:",
        "niche": "Niche:",
        "description": "Description:",
        "tags": "Tags:",
        "script": "Script:"
    }
    
    result = {"input": prompt, "metadata": {}}
    
    for key, header in sections.items():
        parts = metadata_text.split(header)
        if len(parts) > 1:
            value = parts[1].split("\n\n")[0].strip()
            if key == "tags":
                value = [tag.strip() for tag in value.split(",")] if value else []
            result["metadata"][key] = value
    
    result["full_response"] = metadata_text
    return result

print("\nJSON Format:")
print(json.dumps(metadata_to_json(metadata, test_prompt), indent=2))