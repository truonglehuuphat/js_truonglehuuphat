import React, { useState, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickerDay } from '@mui/x-date-pickers';
import type { PickerDayProps } from '@mui/x-date-pickers';
import { Badge, Tooltip, Box, Typography, Chip, Paper, Stack, FormControl, InputLabel, Select, MenuItem, InputBase, styled, ButtonGroup, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { TimeSlotPicker } from '../patient/TimeSlotPickerPage';
import { TimeType, type TimeSlot } from '../../types/appointment';


interface DoctorScheduleCalendarProps {
    timeSlots: TimeSlot[];
    onSelectSlot?: (slot: TimeSlot) => void;
}

// Format giờ dạng HH:mm từ chuỗi ISO
const formatTime = (isoString: string) => {
    return dayjs(isoString).format('HH:mm');
};

export default function DoctorScheduleCalendar({ timeSlots, onSelectSlot }: DoctorScheduleCalendarProps) {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [selectedTime, setSelectedTime] = useState<string>('');

    // 1. Gom nhóm danh sách timeSlot theo ngày dạng "YYYY-MM-DD"
    const slotsByDate = useMemo(() => {
        const map = new Map<string, TimeSlot[]>();
        if (!Array.isArray(timeSlots)) return map;

        timeSlots.forEach((slot) => {
            const dateKey = dayjs(slot.date).format('YYYY-MM-DD');
            if (!map.has(dateKey)) {
                map.set(dateKey, []);
            }
            map.get(dateKey)!.push(slot);
        });
        return map;
    }, [timeSlots]);


    // 2. Custom render cho từng ô ngày trên Lịch
    const renderServerDay = (props: PickerDayProps<Dayjs>) => {
        const { day, outsideCurrentMonth, ...other } = props;
        const dateKey = day.format('YYYY-MM-DD');
        const availableSlots = slotsByDate.get(dateKey) || [];
        const hasSlots = availableSlots.length > 0;

        // Chuỗi hiển thị danh sách khung giờ rảnh khi Hover
        const tooltipContent = hasSlots
            ? `Giờ rảnh:\n` + availableSlots.map((s) => `• ${formatTime(s.startTime)} - ${formatTime(s.endTime)}`).join('\n')
            : '';

        return (
            <Tooltip
                title={tooltipContent ? <span style={{ whiteSpace: 'pre-line' }}>{tooltipContent}</span> : ''}
                arrow
                placement="top"
            >
                <Badge
                    key={props.day.toString()}
                    overlap="circular"
                    badgeContent={hasSlots ? '•' : undefined}
                    sx={{
                        '& .MuiBadge-badge': {
                            color: 'primary.main',
                            fontSize: '1.4rem',
                            bottom: 6,
                            right: 16,
                            pointerEvents: 'none',
                        },
                    }}
                >
                    <PickerDay
                        {...other}
                        outsideCurrentMonth={outsideCurrentMonth}
                        day={day}
                        sx={{
                            ...(hasSlots && {
                                fontWeight: 'bold',
                                bgcolor: 'action.hover',
                            }),
                        }}
                    />
                </Badge>
            </Tooltip>
        );
    };

    // Lấy danh sách các suất khám trong ngày đang được click chọn
    const currentSelectedDateKey = selectedDate ? selectedDate.format('YYYY-MM-DD') : '';
    const activeSlots = useMemo(() => {
        return slotsByDate.get(currentSelectedDateKey) || [];
    }, [slotsByDate, currentSelectedDateKey]);

    // Danh sách chuỗi "HH:mm" truyền vào TimeSlotPicker
    const availableTimeStrings = useMemo(() => {
        return activeSlots.map((m) => {
            if (!m.isBlocked) {
                return formatTime(m.startTime);
            }
        })
    }, [activeSlots]);

    const unavailableTimeStrings = useMemo(() => {
        return activeSlots.map((m) => {
            if (m.isBlocked) {
                return formatTime(m.startTime);
            } {
                return ""
            }
        })
    }, [activeSlots]);


    const handleTimeSelect = (time: string) => {

        setSelectedTime(time);
        // Khởi tạo đối tượng Date từ chuỗi ISO và chuyển về HH:mm
        const matchedSlot = activeSlots.find((slot) => formatTime(slot.startTime) === time);
        console.log("matchedSlot",matchedSlot);
        if (matchedSlot) {
            const timeType = time < "13:00" ? TimeType.morning : TimeType.afternoon;
            // 2. Tạo object mới để giữ tính Immutability trong React
            const updatedSlot = {
                ...matchedSlot,
                timeType,
            };

            setSelectedSlot(updatedSlot);
            if (onSelectSlot) {
                onSelectSlot(updatedSlot);
            }
        } else {
            setSelectedSlot(null);
            if (onSelectSlot) {
                onSelectSlot(null);
            }
        }
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, textAlign: 'center' }}>
                    Lịch Khám Bác Sĩ
                </Typography>

                <DateCalendar
                    value={selectedDate}
                    onChange={(newDate) => {
                        setSelectedDate(newDate);
                        setSelectedSlot(null);
                        setSelectedTime('');
                        if (onSelectSlot) onSelectSlot(null);
                    }}
                    slots={{
                        day: renderServerDay,
                    }}
                />

                {/* Danh sách khung giờ có thể chọn của ngày đang click */}
                <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        Khung giờ khả dụng ngày {selectedDate?.format('DD/MM/YYYY')}:
                    </Typography>

                    {activeSlots.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                            Bác sĩ không có lịch làm việc trong ngày này.
                        </Typography>
                    ) : (
                        <Stack spacing={1} sx={{ direction: "row", flexWrap: "wrap" }} useFlexGap>
                            <TimeSlotPicker
                                bookedTimeSlots={unavailableTimeStrings}
                                onSelectTimeSlot={handleTimeSelect}
                                value={selectedTime}
                            />
                        </Stack>
                    )}
                </Box>
            </Paper>
        </LocalizationProvider>
    );
}
