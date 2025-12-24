import os
import sys
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
import time

# Load API Key
load_dotenv()

# CHECK: Did the user actually set the key?
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    print("ERROR: GROQ_API_KEY not found.")
    print("   Make sure you have a .env file with GROQ_API_KEY=gsk_...")
    sys.exit(1)

#llm setting up
try:
    llm = ChatGroq(
        model="llama-3.3-70b-versatile", #model used
        temperature=0.7, #higher the temperature higher the unpredictability
        api_key=api_key
    )
except Exception as e:
    print(f"Error initializing Groq: {e}")
    sys.exit(1)


def get_patient_prompt(patient_type):
    """Returns the acting instructions based on the chosen condition."""

    if patient_type == "1":  # Broca's (Non-Fluent)
        return (
            "You are roleplaying as a patient with Broca's Aphasia. "
            "ACTING RULES: "
            "1. Your speech must be slow, halting, and effortful. "
            "2. Use only key nouns and verbs (Telegraphic speech). "
            "3. Omit function words like 'the', 'is', 'at', 'and'. "
            "4. Example: instead of 'I want to go to the store', say 'Want... store... go.' "
            "5. Sound frustrated when you can't find a word. "
            "6. Keep responses short."
        )
    elif patient_type == "2":  # Wernicke's (Fluent but Nonsense)
        return (
            "You are roleplaying as a patient with Wernicke's Aphasia. "
            "ACTING RULES: "
            "1. Speak very fluently and confidently, with normal speed. "
            "2. Your sentences should be grammatically correct but meaningless ('Word Salad'). "
            "3. Use made-up words (neologisms) frequently. "
            "4. You are UNAWARE that you are not making sense. Act happy and confused if the user doesn't understand. "
            "5. Example: 'The glimber is waving at the sky melon today.' "
        )
    else:
        return "You are a helpful assistant."


def main():
    print("Virtual Aphasia Patient Simulator")
    time.sleep(2)
    print("You are acting as a person communicating with an aphasia patient.")
    time.sleep(1)
    print("Be nice")
    time.sleep(1)
    print("Select a Patient Profile to practice with:")
    print("1. Broca's = Non-Fluent (Broken speech)")
    print("2. Wernicke's = Fluent (Smooth speech, but nonsense)")

    choice = input("\nEnter 1 or 2: ").strip()

    system_instruction = get_patient_prompt(choice)
    history = [SystemMessage(content=system_instruction)]

    print("\n(Simulation Started. Type q || quit || exit to end.)")
    print("Patient: *looks at you waiting*")

    while True:
        user_input = input("You: ").strip()

        if user_input.lower() in ['quit', 'exit','q']:
            print("Simulation ended.")
            break

        # Add user message to history
        history.append(HumanMessage(content=user_input))

        try:
            # Get response from AI
            response = llm.invoke(history)

            print(f"Patient: {response.content}")

            # Add AI response to history so it remembers the conversation
            history.append(response)

        except Exception as e:
            print(f"Error during chat: {e}")


if __name__ == "__main__":
    main()