
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignatureInputProps {
  signature: string;
  setSignature: (value: string) => void;
}

export function SignatureInput({ signature, setSignature }: SignatureInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="signature">Sign by typing your full name *</Label>
      <Input
        id="signature"
        value={signature}
        onChange={(e) => setSignature(e.target.value)}
        placeholder="Type your full name here"
        required
      />
    </div>
  );
}
