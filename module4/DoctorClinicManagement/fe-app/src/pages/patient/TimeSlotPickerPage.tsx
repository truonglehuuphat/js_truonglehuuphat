import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  Paper,
  Tooltip,
  Chip,
  Divider,
} from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface TimeSlotPickerProps {
  /** Danh sách các khung giờ đã bị đặt (VD: ["08:30", "13:30", "15:00"]) */
  bookedTimeSlots?: string[];
  /** Callback trả về giá trị khung giờ được chọn */
  onSelectTimeSlot?: (selectedTime: string) => void;
  /** Khung giờ được chọn mặc định */
  value?: string;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  bookedTimeSlots = [],
  onSelectTimeSlot,
  value,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(value || null);

  // Hàm tạo danh sách khung giờ theo khoảng thời gian bắt đầu & kết thúc (phút)
  const generateTimeSlots = (startHour: number, endHour: number): string[] => {
    const slots: string[] = [];
    let startMinutes = startHour * 60;
    const endMinutes = endHour * 60;

    while (startMinutes < endMinutes) {
      const hours = Math.floor(startMinutes / 60);
      const mins = startMinutes % 60;

      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMins = mins.toString().padStart(2, '0');

      slots.push(`${formattedHours}:${formattedMins}`);
      startMinutes += 30; // Mỗi nút cách nhau 30 phút
    }

    return slots;
  };

  const morningSlots = generateTimeSlots(8, 12);  // 08:00 -> 11:30
  const afternoonSlots = generateTimeSlots(13, 17); // 13:00 -> 16:30

  const handleSelect = (time: string) => {
    setSelectedSlot(time);
    if (onSelectTimeSlot) {
      onSelectTimeSlot(time);
    }
  };

  // Helper render nhóm nút ButtonGroup cho từng ca
  const renderSlotGroup = (slots: string[]) => (
    <Box sx={{ overflowX: 'auto', py: 1 }}>
      <ButtonGroup variant="outlined" aria-label="time slot selection group">
        {slots.map((slot) => {
          const isBooked = bookedTimeSlots.includes(slot);
          const isSelected = selectedSlot === slot;

          const buttonEl = (
            <Button
              key={slot}
              disabled={isBooked}
              onClick={() => handleSelect(slot)}
              variant={isSelected ? 'contained' : 'outlined'}
              color={isSelected ? 'primary' : 'inherit'}
              sx={{
                px: 2,
                py: 1,
                fontWeight: isSelected ? 'bold' : 'normal',
                textDecoration: isBooked ? 'line-through' : 'none',
                whiteSpace: 'nowrap',
                '&.Mui-disabled': {
                  bgcolor: 'action.disabledBackground',
                  color: 'text.disabled',
                },
              }}
            >
              {slot}
            </Button>
          );

          return isBooked ? (
            <Tooltip key={slot} title="Khung giờ này đã được đặt" arrow>
              <span>{buttonEl}</span>
            </Tooltip>
          ) : (
            buttonEl
          );
        })}
      </ButtonGroup>
    </Box>
  );

  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 650, borderRadius: 3 }}>
      <Box sx={{display:"flex", alignItems:"center", gap:1, mb:3}} >
        <AccessTimeIcon color="primary" />
        <Typography sx={{variantvariant:"h6", fontWeight:"bold"}}>
          Chọn khung giờ khám
        </Typography>
      </Box>

      {/* Ca Sáng */}
      <Box sx={{mb:3}}>
        <Box sx={{display:"flex", alignItems:"center", gap:1, mb:1}}>
          <WbSunnyIcon sx={{ color: '#f57c00', fontSize: 20 }} />
          <Typography sx ={{variant:"subtitle1", fontWeight:"600", color:"text.primary"}}>
            Buổi sáng (08:00 - 12:00)
          </Typography>
        </Box>
        {renderSlotGroup(morningSlots)}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Ca Chiều */}
      <Box sx={{mb:3}}>
        <Box sx={{display:"flex", alignItems:"center", gap:1, mb:1}}>
          <NightlightRoundIcon sx={{ color: '#0288d1', fontSize: 20 }} />
          <Typography sx ={{variant:"subtitle1", fontWeight:"600", color:"text.primary"}}>
            Buổi chiều (13:00 - 17:00)
          </Typography>
        </Box>
        {renderSlotGroup(afternoonSlots)}
      </Box>

      {/* Trạng thái lựa chọn */}
      <Box sx={{display:"flex", alignItems:"center", gap:1, mb:1}}>
        <Typography variant="body2" color="text.secondary">
          Trạng thái:
        </Typography>
        {selectedSlot ? (
          <Chip
            label={`Đã chọn: ${selectedSlot}`}
            color="success"
            size="small"
            variant="filled"
          />
        ) : (
          <Chip
            label="Chưa chọn khung giờ"
            color="default"
            size="small"
            variant="outlined"
          />
        )}
      </Box>
    </Paper>
  );
};