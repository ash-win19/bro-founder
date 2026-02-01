import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}

const EditableField = ({ label, value, onChange, multiline = false }: EditableFieldProps) => {
  return (
    <div className="space-y-1.5">
      <label className="text-sm text-muted-foreground">{label}</label>
      {multiline ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-border/50 focus:border-primary/50 resize-none min-h-[80px] text-foreground"
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-border/50 focus:border-primary/50 text-foreground"
        />
      )}
    </div>
  );
};

export default EditableField;
